"use client";

import { createContext, useContext, useState } from "react";
import type { Artist } from "@/lib/types";

type TrackContextProviderProps = {
    children: React.ReactNode;
};

type TrackContext = {
    // spotify歌曲ID
    spotifyTrackID: string[];
    setSpotifyTrackID: React.Dispatch<React.SetStateAction<string[]>>;
    // youtube影片ID
    currentTrack: string[];
    setCurrentTrack: React.Dispatch<React.SetStateAction<string[]>>;
    // 歌曲封面
    trackImage: string[];
    setTrackImage: React.Dispatch<React.SetStateAction<string[]>>;
    // 歌曲名稱
    trackName: string[];
    setTrackName: React.Dispatch<React.SetStateAction<string[]>>;
    // 歌手們的名稱
    artists: Artist[][];
    setArtists: React.Dispatch<React.SetStateAction<Artist[][]>>;
    // 歌曲位置
    trackIndex: number;
    setTrackIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const TrackContext = createContext<TrackContext | null>(null);

export default function TrackContextProvider({
    children,
}: TrackContextProviderProps) {
    const [spotifyTrackID, setSpotifyTrackID] = useState<string[]>([""]);
    const [currentTrack, setCurrentTrack] = useState<string[]>([""]);
    const [trackImage, setTrackImage] = useState<string[]>([""]);
    const [trackName, setTrackName] = useState<string[]>([""]);
    const [artists, setArtists] = useState<Artist[][]>([[]]);
    const [trackIndex, setTrackIndex] = useState<number>(0);

    return (
        <TrackContext.Provider
            value={{
                spotifyTrackID,
                setSpotifyTrackID,
                currentTrack,
                setCurrentTrack,
                trackImage,
                setTrackImage,
                trackName,
                setTrackName,
                artists,
                setArtists,
                trackIndex,
                setTrackIndex,
            }}
        >
            {children}
        </TrackContext.Provider>
    );
}

export function useTrackContext() {
    const context = useContext(TrackContext);
    if (!context) {
        throw new Error(
            "useTrackContext must be used within a TrackContextProvider"
        );
    }
    return context;
}
