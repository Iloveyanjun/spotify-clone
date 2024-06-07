"use client";

import { useTrackContext } from "@/context/player-context";
import Image from "next/image";
import { Roboto_Mono } from "next/font/google";
import { searchVideoId } from "@/apis/youtube";
import { use, useEffect, useState } from "react";
import { set } from "lodash";

const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
});

export default function ArtistTopTrack({
    index,
    id, // 歌曲 spotifyID
    name, // 歌曲名稱
    duration, // 歌曲時間
    image, // 歌曲封面
    artists, // 演出者
}: {
    index: number;
    id: string;
    name: string;
    duration: number;
    image: string;
    artists: { name: string; id: string }[];
}) {
    const {
        setSpotifyTrackID,
        currentTrack,
        spotifyTrackID,
        trackIndex,
        setCurrentTrack,
        setTrackImage,
        setTrackName,
        setArtists,
        setTrackIndex,
    } = useTrackContext();

    function changeStyle() {
        if (spotifyTrackID[trackIndex] === id) {
            setPlayingStyle("text-spotify");
        } else {
            setPlayingStyle("");
        }
    }

    const [playingStyle, setPlayingStyle] = useState("");
    useEffect(() => {
        changeStyle();
    }, [spotifyTrackID, trackIndex, id]);

    useEffect(() => {
        changeStyle();
    }, []);

    const mins = Math.floor(duration / 1000 / 60);
    const secs = Math.floor((duration / 1000 / 60 - mins) * 60)
        .toString()
        .padStart(2, "0");

    const handleClick = async (e: any) => {
        e.preventDefault();
        const dudes = artists.map((a) => a.name).join(", ");
        const search = `${name} ${dudes} audio`;

        const res = await searchVideoId(search);

        if (!res) console.log("exceed youtube api limit");
        else {
            const videoId = res.items[0].id.videoId;
            setTrackName((prevTrackName) => {
                const newName = prevTrackName.slice(0, currentTrack.length);
                return [...newName, name];
            });

            setTrackImage((prevTrackCover) => {
                const newCover = prevTrackCover.slice(0, currentTrack.length);
                return [...newCover, image];
            });

            setArtists((prevArtists) => {
                const newArtists = prevArtists.slice(0, currentTrack.length);
                return [...newArtists, artists];
            });

            setSpotifyTrackID((prevID) => {
                const newID = prevID.slice(0, currentTrack.length);
                return [...newID, id];
            });
            setCurrentTrack((preCurrentTrack) => [...preCurrentTrack, videoId]);
            setTrackIndex(currentTrack.length);
        }
    };

    return (
        <div
            className="flex p-4 lg:w-[55%] md:w-3/4 sm:w-full hover:bg-neutral-500/10 rounded-md hover:cursor-pointer"
            onClick={handleClick}
        >
            <div className="self-center mr-4 text-inactive">
                <button className={`${roboto_mono.className}`}>
                    {index + 1}
                </button>
            </div>
            <div className="mr-3 w-10 h-10 sm:hidden lg:flex">
                <Image
                    className="w-10 h-10"
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    draggable={false}
                />
            </div>
            <div
                className={`text-ellipsis text-nowrap overflow-hidden ${playingStyle}`}
            >
                {name}
            </div>
            <div
                className={`ml-auto self-center text-inactive text-sm ${roboto_mono.className}`}
            >
                {mins}:{secs}
            </div>
        </div>
    );
}
