"use client";
import React, { use, useEffect, useRef, useState } from "react";
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
    const playerRef = useRef<YT.Player | null>(null);
    const iframeRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { currentTrack: videoID, setCurrentTrack } = useTrackContext();
    const [previousVideoId, setPreviousVideoId] = useState<string>("");

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
            videoId,
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
        event.target.setVolume(volume);
        setIsPlaying(true);
    };

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
            <button onClick={togglePlayPause} className="active:scale-[1.1]">
                {isPlaying ? (
                    <PauseCircleIcon fontSize="large" />
                ) : (
                    <PlayCircleIcon fontSize="large" />
                )}
            </button>
        </div>
    );
};

export default YouTubePlayer;
