"use client";
import Link from "next/link";
import VolumeSlider from "./VolumeSlider";
import YouTubePlayer from "./YoutubePlayer";
import LikeBtn from "./LikeBtn";
import Image from "next/image";
import { useTrackContext } from "@/context/player-context";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LyricsIcon from "@mui/icons-material/Lyrics";

export default function Player() {
    const pathname = usePathname();
    const {
        spotifyTrackID,
        currentTrack,
        trackImage,
        trackName,
        artists,
        trackIndex,
        currentTime,
    } = useTrackContext();
    const [volume, setVolume] = useState(50);

    // 如果是登入或註冊頁面就不顯示播放器
    if (pathname === "/login" || pathname === "/signup") {
        return null;
    }

    // console.log("目前所有歌名: " + trackName);
    // console.log("目前所有的spotify id: " + spotifyTrackID);
    // console.log("目前所有的spotify id 長度 = " + spotifyTrackID.length);

    // console.log("目前youtube影片ID長度 = " + currentTrack.length);
    // console.log("目前所有youtube影片ID: " + currentTrack);
    // console.log("索引值: " + trackIndex);
    // console.log("目前所有封面: " + trackImage);
    // console.log("目前所有演出者: " + artists);
    // console.log("目前第幾秒ms: " + currentTime );

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
                <Link
                    href="/lyrics"
                    className="self-center px-[10px] items-center mt-[2px]"
                >
                    <LyricsIcon />
                </Link>
                <LikeBtn />
                <VolumeSlider volume={volume} setVolume={setVolume} />
            </div>
        </div>
    );
}
