"use client";

import { useTrackContext } from "@/context/player-context";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";
import { set } from "zod";

const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
});

export default function AlbumTrack({
    id,
    index,
    name,
    artists,
    duration,
    cover,
}: {
    id: string;
    index: number;
    name: string;
    artists: { name: string; id: string }[];
    duration: number;
    cover: string;
}) {
    const {
        currentTrack,
        setSpotifyTrackID,
        setCurrentTrack,
        setTrackImage,
        setTrackName,
        setArtists,
        setTrackIndex,
    } = useTrackContext();

    // 計算歌曲時間
    const mins = Math.floor(duration / 1000 / 60);
    // 讓秒數一定是兩位數
    const secs = Math.floor((duration / 1000 / 60 - mins) * 60)
        .toString()
        .padStart(2, "0");

    const handleClick = async (e: any) => {
        e.preventDefault();
        // 把所有該歌曲的藝術家名稱串接起來 作為youtube api搜尋的關鍵字
        const dudes = artists.map((a) => a.name).join(", ");
        // youtube api 使用歌曲名稱和藝術家名稱搜尋歌曲, 回傳youtube影片ID
        const search = `${name} ${dudes} audio`;
        const res = await fetch(`/api?search=${search}`);
        const data = await res.json();
        setTrackName((preTrackName) => [...preTrackName, name]);
        setTrackImage((preTrackCover) => [...preTrackCover, cover]);
        setArtists((preArtists) => [...preArtists, artists]);
        // 這是spotify歌曲ID
        setSpotifyTrackID((preID) => [...preID, id]);
        // 這是youtube影片ID 更新目前的歌曲
        setCurrentTrack((preCurrentTrack) => [
            ...preCurrentTrack,
            data.videoId,
        ]);
        setTrackIndex(currentTrack.length);
    };

    return (
        <div
            className="flex mx-3 justify-between py-2 hover:bg-neutral-500/10 hover:cursor-pointer select-none"
            onClick={handleClick}
        >
            <div className="flex cursor-pointer">
                {/* index顯示歌曲順序 (對其第二位數字) */}
                <div className="self-center mr-4 text-inactive">
                    <div
                        className={`mx-4 self-center text-inactive flex items-center ${roboto_mono.className}`}
                    >
                        {index + 1 < 10 ? <span>&nbsp;</span> : null}
                        {index + 1}
                    </div>
                </div>
                <div className="flex flex-col">
                    {/* track name */}
                    <div className="text-base">{name}</div>
                    {/* track artists */}
                    <div className="flex text-inactive">
                        {artists.map((artist, index) => (
                            <div key={index} className="flex">
                                <Link
                                    href={`/artist/${artist.id}`}
                                    className="hover:underline text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    {artist.name}
                                </Link>
                                {index === artists.length - 1 ? null : (
                                    <div className="mr-1">,</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* 歌曲持續時間 */}
            <div
                className={`self-center mr-10 text-sm text-inactive ${roboto_mono.className} cursor-pointer`}
            >
                {mins}:{secs}
            </div>
        </div>
    );
}
