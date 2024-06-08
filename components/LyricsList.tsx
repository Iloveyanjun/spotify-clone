"use client";

import { useEffect, useRef, useState } from "react";
import { useTrackContext } from "@/context/player-context";
import Lyrics from "./Lyrics";
import { getLyrics } from "@/apis/lyrics";

export default function LyricsList() {
    const { currentTime, spotifyTrackID, trackIndex } = useTrackContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lyricsData, setLyricsData] = useState<
        { startTimeMs: number; words: string }[]
    >([]);
    const lyricsRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (!spotifyTrackID[trackIndex]) {
                    console.log("No track ID");
                    return;
                }
                const allLyrics = await getLyrics(spotifyTrackID[trackIndex]);
                setLyricsData(allLyrics.lyrics.lines);
            } catch (error) {
                console.error("獲取歌詞失敗: ", error);
            }
        }
        fetchData();
    }, [trackIndex]);

    useEffect(() => {
        for (let i = lyricsData.length - 1; i >= 0; i--) {
            if (currentTime >= Number(lyricsData[i].startTimeMs)) {
                setCurrentIndex(i);
                break;
            }
        }
    }, [currentTime, lyricsData]);

    useEffect(() => {
        const currentRef = lyricsRefs.current[
            currentIndex
        ] as HTMLDivElement | null;
        if (currentRef) {
            currentRef.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [currentIndex]);

    return (
        <div>
            {lyricsData.map((lyric, index) => (
                <div
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                        lyricsRefs.current[index] = el!;
                    }}
                >
                    <Lyrics
                        words={lyric.words}
                        isHighlighted={index === currentIndex && currentTime > lyricsData[0].startTimeMs}
                    />
                </div>
            ))}
        </div>
    );
}
