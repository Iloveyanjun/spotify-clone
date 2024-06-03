"use client";
import type { PlaylistTrackData } from "@/lib/types";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";
import Image from "next/image";
import { useTrackContext } from "@/context/player-context";
import { set } from "zod";

const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
});

export default function PlaylistTrack({
    id,
    index,
    name,
    cover,
    artists,
    duration,
    album,
    addedAt,
}: PlaylistTrackData) {
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
    // ISO 轉換為日期
    const date = new Date(addedAt);
    const newDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

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
            <div className="flex cursor-pointer w-[30%]">
                {/* index顯示歌曲順序 (對其第二位數字) */}
                <div className="self-center mr-4 text-inactive">
                    <div
                        className={`mx-4 self-center text-inactive flex items-center ${roboto_mono.className}`}
                    >
                        {index + 1 < 10 ? <span>&nbsp;</span> : null}
                        {index + 1}
                    </div>
                </div>
                <div>
                    <Image
                        className="self-center rounded-md mr-2 w-12 h-12"
                        src={cover}
                        alt={name}
                        width={48}
                        height={48}
                    />
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
            <div className="self-center text-inactive text-sm w-[20%] text-nowrap text-ellipsis overflow-hidden">
                <Link
                    href={`/album/${album.id}`}
                    className="hover:underline"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {album.name}
                </Link>
            </div>
            <div className="self-center text-inactive text-sm w-[20%]">
                {newDate}
            </div>
            {/* 歌曲持續時間 */}
            <div
                className={`self-center mr-10 text-sm text-inactive ${roboto_mono.className} cursor-pointer w-[10%]`}
            >
                {mins}:{secs}
            </div>
        </div>
    );
}
