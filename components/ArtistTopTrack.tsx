"use client";

import { useTrackContext } from "@/context/player-context";
import Image from "next/image";

export default function ArtistTopTrack({
    index,
    id,   // 歌曲 id
    name, // 歌曲名稱
    duration, // 歌曲時間
    image,   // 歌曲封面
    mainArtist, // 主要演出者
    artists,  // 演出者
}: {
    index: number;
    id: string;
    name: string;
    duration: number;
    image: string;
    mainArtist: string;
    artists: { name: string; id: string }[];
}) {
    const { currentTrack, setCurrentTrack, setTrackImage, setTrackName, setArtists } = useTrackContext();

    const mins = Math.floor(duration / 1000 / 60);
    const secs = Math.floor((duration / 1000 / 60 - mins) * 60)
        .toString()
        .padStart(2, "0");

    const handleClick = async (e: any) => {
        e.preventDefault();
        const dudes = artists.map((a) => a.name).join(", ");
        const search = `${name} ${dudes} audio`;

        const res = await fetch(`/api?search=${search}`);
        const data = await res.json();
        setTrackName(name);
        setTrackImage(image);
        setArtists(artists);
        setCurrentTrack(data.videoId);
    };

    return (
        <div className="flex p-4 w-[55%] hover:bg-neutral-500/10 rounded-md">
            <form
                onSubmit={handleClick}
                className="self-center mr-4 text-inactive"
            >
                <button>{index + 1}</button>
            </form>
            <div className="mr-3">
                <Image src={image} alt={name} width={40} height={40} />
            </div>
            <div>{name}</div>
            <div className="ml-auto self-center text-inactive text-sm">
                {mins}:{secs}
            </div>
        </div>
    );
}
