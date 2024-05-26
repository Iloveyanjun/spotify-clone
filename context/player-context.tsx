"use client";

import { createContext, useContext, useState } from "react";

type TrackContextProviderProps = {
    children: React.ReactNode;
};

type TrackContext = {
    currentTrack: string;
    setCurrentTrack: React.Dispatch<React.SetStateAction<string>>;
    trackImage: string;
    setTrackImage: React.Dispatch<React.SetStateAction<string>>;
    trackName: string;
    setTrackName: React.Dispatch<React.SetStateAction<string>>;
    artists: { name: string; id: string }[];
    setArtists: React.Dispatch<
        React.SetStateAction<{ name: string; id: string }[]>
    >;
};

export const TrackContext = createContext<TrackContext | null>(null);

export default function TrackContextProvider({
    children,
}: TrackContextProviderProps) {
    const [currentTrack, setCurrentTrack] = useState("");
    const [trackImage, setTrackImage] = useState("");
    const [trackName, setTrackName] = useState("");
    const [artists, setArtists] = useState<{ name: string; id: string }[]>([]);

    return (
        <TrackContext.Provider
            value={{
                currentTrack,
                setCurrentTrack,
                trackImage,
                setTrackImage,
                trackName,
                setTrackName,
                artists,
                setArtists,
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
