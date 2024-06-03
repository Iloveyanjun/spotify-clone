"use client";
import Link from "next/link";
import VolumeSlider from "./VolumeSlider";
import YouTubePlayer from "./YoutubePlayer";
import LikeBtn from "./LikeBtn";
import Image from "next/image";
import { useTrackContext } from "@/context/player-context";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Player() {
    const pathname = usePathname();
    const {
        spotifyTrackID,
        currentTrack,
        trackImage,
        trackName,
        artists,
        trackIndex,
    } = useTrackContext();
    const [volume, setVolume] = useState(50);

    // 如果是登入或註冊頁面就不顯示播放器
    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    console.log("Spotify Tracks IDs" + spotifyTrackID);
    console.log("track index " + trackIndex);

    return (
        <div className="flex justify-between items-center fixed bottom-0 w-full bg-black h-20">
            <div className="flex pl-2 w-[600px] select-none">
                <div className=" w-14 h-14 rounded-md object-cover">
                    {trackImage[trackIndex] && (
                        <Image
                            className="rounded-md w-14 h-14 object-cover"
                            src={trackImage[trackIndex]}
                            alt="image"
                            width={56}
                            height={56}
                            draggable={false}
                        />
                    )}
                </div>
                <div className="flex flex-col pl-3 self-center">
                    <div className="text-sm lg:flex md:text-ellipsis md:text-wrap md:overflow-hidden sm:text-ellipsis sm:text-nowrap sm:overflow-hidden">
                        {trackName[trackIndex]}
                    </div>
                    <div className="lg:flex text-inactive text-xs sm:hidden md:hidden ">
                        {artists[trackIndex]?.map((artist, index) => (
                            <div key={index} className="flex">
                                <Link
                                    href={`/artist/${artist.id}`}
                                    className="hover:underline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    {artist.name}
                                </Link>
                                {index ===
                                artists[trackIndex].length - 1 ? null : (
                                    <div className="mr-1">,</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <YouTubePlayer
                    videoId={currentTrack[trackIndex]}
                    volume={volume}
                    setVolume={setVolume}
                />
            </div>
            <div className="flex justify-end w-[600px]">
                <LikeBtn />
                <VolumeSlider volume={volume} setVolume={setVolume} />
            </div>
        </div>
    );
}
