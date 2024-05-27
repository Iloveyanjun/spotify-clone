"use client";

import { useTrackContext } from "@/context/player-context";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
});

export default function AlbumTrack({
    index,
    name,
    artists,
    duration,
    cover,
}: {
    index: number;
    name: string;
    artists: { name: string; id: string }[];
    duration: number;
    cover: string;
}) {
    const {
        currentTrack,
        setCurrentTrack,
        setTrackImage,
        setTrackName,
        setArtists,
    } = useTrackContext();

    // 計算歌曲時間
    const mins = Math.floor(duration / 1000 / 60);
    // 讓秒數一定是兩位數
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
        setTrackImage(cover);
        setArtists(artists);
        setCurrentTrack(data.videoId);
    };

    return (
        <div className="flex mx-3 justify-between py-2 hover:bg-neutral-500/10 select-none">
            <div className="flex">
                {/* index 對其第二位數字 */}
                <form
                    onSubmit={handleClick}
                    className="self-center mr-4 text-inactive"
                >
                    <button className={`mx-4 self-center text-inactive flex items-center ${roboto_mono.className}`}>
                        {index + 1 < 10 ? (
                            <span>&nbsp;</span>
                        ) : null}
                        {index + 1}
                    </button>
                </form>
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
            <div className={`self-center mr-10 text-sm text-inactive ${roboto_mono.className}`}>
                {mins}:{secs}
            </div>
        </div>
    );
}
