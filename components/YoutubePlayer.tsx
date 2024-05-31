"use client";
import React, { useEffect, useRef, useState } from "react";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useTrackContext } from "@/context/player-context";

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
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { currentTrack: videoID, setCurrentTrack } = useTrackContext();
    // 影片播放進度 秒數
    const [progressSec, setProgressSec] = useState<number>(0);
    // 影片播放進度 以字串 分鐘:秒數 顯示
    const [progress, setProgress] = useState("0");
    // 影片時間長度 以字串 分鐘:秒數 顯示
    const [duration, setDuration] = useState("");
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
        if (videoID) {
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
            videoId: videoID,
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
            setCurrentTrack("");
        }
    };

    const onPlayerReady = (event: YT.PlayerEvent) => {
        event.target.playVideo(); // 播放影片
        const getVideoDuration = playerRef.current?.getDuration();
        // 獲得影片時間長度
        if (getVideoDuration) {
            const minutes = Math.floor(getVideoDuration / 60);
            const seconds = Math.floor(getVideoDuration % 60);
            setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }

        event.target.setVolume(volume);
        setIsPlaying(true);

        updateCurrentTime();
    };

    // 更新目前影片播放到哪裡 每秒更新一次
    function updateCurrentTime() {
        if (!isDragging && playerRef.current) {
            const currentTime = playerRef.current?.getCurrentTime() || 0;
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

    function handleMouseUp() {
        setIsDragging(false);
        if (playerRef.current) {
            const value = Number(progressRef.current?.value);
            playerRef.current?.seekTo(value, true);
        }
    }

    return (
        <div>
            <div id="player" ref={iframeRef} style={{ display: "none" }}></div>
            <div className="flex flex-col items-center justify-between h-[60px]">
                <div className="pt-1">
                    <button
                        onClick={togglePlayPause}
                        className="active:scale-[1.1]"
                    >
                        {isPlaying ? (
                            <PauseCircleIcon fontSize="large" />
                        ) : (
                            <PlayCircleIcon fontSize="large" />
                        )}
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
                        max={playerRef.current?.getDuration()}
                        value={progressSec}
                        className="w-[550px] progress-slider"
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
