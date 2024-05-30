"use client";
import React, { use, useEffect, useRef, useState } from "react";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useTrackContext } from "@/context/player-context";
import { duration } from "@mui/material";

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
    const [previousVideoId, setPreviousVideoId] = useState<string>("");
    const [progress, setProgress] = useState("0");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        if (progressRef.current && playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();
            const videoDuration = playerRef.current.getDuration();
            const progressPercent = (currentTime / videoDuration) * 100;
            progressRef.current.style.setProperty(
                "--range-value",
                `${progressPercent}%`
            );
        }
    }, [progress]);

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
                autoplay: 1, // 1自動播放 0不自動播放
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
        // 可以在这里控制视频
        // event.target.playVideo(); // 自动播放视频
        const getVideoDuration = playerRef.current?.getDuration();
        if (getVideoDuration) {
            const minutes = Math.floor(getVideoDuration / 60);
            const seconds = Math.floor(getVideoDuration % 60);
            setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }

        event.target.setVolume(volume);
        setIsPlaying(true);
        updateCurrentTime();
    };

    function updateCurrentTime() {
        const currentTime = playerRef.current!.getCurrentTime();
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        setProgress(`${minutes}:${seconds.toString().padStart(2, "0")}`);

        setTimeout(updateCurrentTime, 1000); // 每秒更新一次
    }

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
                        value={playerRef.current?.getCurrentTime() || 0}
                        className="w-[550px] progress-slider"
                        ref={progressRef}
                        onChange={(e) => {console.log("HELLO") }}
                    />
                    <div className="ml-2 p-0">{duration}</div>
                </div>
            </div>
        </div>
    );
};

export default YouTubePlayer;
