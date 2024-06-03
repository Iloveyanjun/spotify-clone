"use client";
import React, { useEffect, useRef, useState } from "react";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useTrackContext } from "@/context/player-context";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { get } from "http";
import { getRecommendations } from "@/apis/spotify";

interface YouTubePlayerProps {
    videoId: string;
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
    videoId,
    volume,
    setVolume,
}) => {
    const progressRef = useRef<HTMLInputElement>(null);
    const playerRef = useRef<YT.Player | null>(null);
    const iframeRef = useRef<HTMLDivElement>(null);

    const {
        currentTrack,
        spotifyTrackID,
        setTrackIndex,
        trackIndex,
        setCurrentTrack,
        setArtists,
        setTrackName,
        setTrackImage,
        setSpotifyTrackID,
    } = useTrackContext();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    // 影片播放進度 秒數
    const [progressSec, setProgressSec] = useState<number>(0);
    // 影片播放進度 以字串 分鐘:秒數 顯示
    const [progress, setProgress] = useState("");
    // 影片時間長度 以字串 分鐘:秒數 顯示
    const [duration, setDuration] = useState("");
    const [durationSec, setDurationSec] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);

    // 進度條更新顏色
    useEffect(() => {
        if (progressRef.current && playerRef.current) {
            const currentTime = progressSec; // 使用 progressSec 更新当前时间
            const videoDuration = playerRef.current.getDuration();
            const progressPercent = (currentTime / videoDuration) * 100;
            progressRef.current.style.setProperty(
                "--range-value",
                `${progressPercent}%`
            );
        }
    }, [progressSec]);

    useEffect(() => {
        if (videoId) {
            // 检查 YouTube IFrame Player API 是否已经加载
            if (window.YT) {
                initializePlayer();
            } else {
                // 动态加载 YouTube IFrame Player API
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag =
                    document.getElementsByTagName("script")[0];
                if (firstScriptTag?.parentNode) {
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
                // 创建一个全局变量以便 YouTube API 调用
                (window as any).onYouTubeIframeAPIReady = initializePlayer;
            }
        }
        // 清除全局变量
        return () => {
            (window as any).onYouTubeIframeAPIReady = null;
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [videoId]);

    // 更新音量
    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.setVolume(volume);
        }
    }, [volume]);

    const initializePlayer = () => {
        playerRef.current = new YT.Player(iframeRef.current!, {
            videoId: videoId,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange, // 播放状态改变时触发
            },
            playerVars: {
                autoplay: 0, // 1自動播放 0不自動播放
                controls: 0, // 隐藏播放器控件
                modestbranding: 1, // 减少 YouTube 品牌暴露
            },
        });
    };

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
        if (event.data === YT.PlayerState.ENDED) {
            setIsPlaying(false);
            nextSong();
        }
    };

    const onPlayerReady = (event: YT.PlayerEvent) => {
        event.target.playVideo(); // 播放影片
        if (playerRef.current) {
            const getVideoDuration = playerRef.current?.getDuration();
            // 獲得影片時間長度
            const minutes = Math.floor(getVideoDuration / 60);
            const seconds = Math.floor(getVideoDuration % 60);
            setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
            setDurationSec(getVideoDuration);
            setIsPlaying(true);
            updateCurrentTime();
            event.target.setVolume(volume);
        }
    };

    // 更新目前影片播放到哪裡 每秒更新一次
    function updateCurrentTime() {
        if (!isDragging && playerRef.current) {
            const currentTime = Math.floor(playerRef.current?.getCurrentTime());
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            setProgress(`${minutes}:${seconds.toString().padStart(2, "0")}`);
            setProgressSec(currentTime);
        }

        setTimeout(updateCurrentTime, 1000); // 每秒更新一次
    }

    // 拖曳進度條時 進度條以及影片播放時間更新為 拖曳的時間
    function draggingTime(e: React.ChangeEvent<HTMLInputElement>) {
        setIsDragging(true);
        if (playerRef.current) {
            const draggingTime = Number(e.target.value);
            setProgressSec(draggingTime);
            const minutes = Math.floor(draggingTime / 60);
            const seconds = Math.floor(draggingTime % 60);
            setProgress(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }
    }

    // 播放/暫停
    const togglePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };
    // 拖曳進度條結束時 更新影片播放時間
    function handleMouseUp() {
        setIsDragging(false);
        if (playerRef.current) {
            const value = Number(progressRef.current?.value);
            playerRef.current?.seekTo(value, true);
        }
    }

    // Next song
    async function nextSong() {
        if (playerRef.current && trackIndex < currentTrack.length - 1) {
            setTrackIndex((preIndex) => preIndex + 1);
        } else {
            // 如果是最後一首歌 就推薦一首隨機歌曲
            console.log(trackIndex);
            const data = await getRecommendations(spotifyTrackID[trackIndex]);
            const dudes = data.artists.map((a) => a.name).join(", ");
            // youtube api 使用歌曲名稱和藝術家名稱搜尋歌曲, 回傳youtube影片ID
            const search = `${data.name} ${dudes} audio`;
            const res = await fetch(`/api?search=${search}`);
            const video = await res.json();
            setTrackName((preTrackName) => [...preTrackName, data.name]);
            setTrackImage((preTrackCover) => [...preTrackCover, data.cover]);
            setArtists((preArtists) => [...preArtists, data.artists]);
            // 這是spotify歌曲ID
            setSpotifyTrackID((preID) => [...preID, data.id]);
            // 這是youtube影片ID 更新目前的歌曲
            setCurrentTrack((preCurrentTrack) => [
                ...preCurrentTrack,
                video.videoId,
            ]);
            setTrackIndex(currentTrack.length);
        }
    }

    function previousSong() {
        if (playerRef.current && trackIndex > 1) {
            setTrackIndex((preIndex) => preIndex - 1);
        }
        console.log(trackIndex);
    }

    return (
        <div>
            <div id="player" ref={iframeRef} style={{ display: "none" }}></div>
            <div className="flex flex-col items-center justify-between h-[60px]">
                <div className="flex justify-between pt-1 w-[150px]">
                    <button className="relative group" onClick={previousSong}>
                        <SkipPreviousIcon
                            fontSize="large"
                            className="text-inactive hover:text-white"
                        />
                        <span className="absolute top-[-75%] left-1/2 group-hover:delay-300 transform -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Previous
                        </span>
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="active:scale-[1.1] relative group"
                    >
                        {isPlaying ? (
                            <PauseCircleIcon fontSize="large" />
                        ) : (
                            <PlayCircleIcon fontSize="large" />
                        )}
                        <span className="absolute top-[-75%] left-1/2 group-hover:delay-300 transform -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {isPlaying ? "Pause" : "Play"}
                        </span>
                    </button>
                    <button className="relative group" onClick={nextSong}>
                        <SkipNextIcon
                            fontSize="large"
                            className="text-inactive hover:text-white"
                        />
                        <span className="absolute top-[-75%] left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:delay-300 transition-opacity duration-300">
                            Next
                        </span>
                    </button>
                </div>
                <div className="flex items-center text-inactive">
                    <div className="mr-2 p-0">
                        {progress === "0" ? "" : progress}
                    </div>
                    <input
                        type="range"
                        id="progressSlider"
                        min={0}
                        max={durationSec}
                        value={progressSec}
                        className="lg:w-[550px] md:w-[350px] sm:w-[200px] progress-slider"
                        ref={progressRef}
                        onChange={draggingTime}
                        onMouseUp={handleMouseUp}
                    />
                    <div className="ml-2 p-0">{duration}</div>
                </div>
            </div>
        </div>
    );
};

export default YouTubePlayer;
