"use client";

import React, { useState, useEffect, useRef } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";

type VolumeSliderProps = {
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
};

export default function VolumeSlider({ volume, setVolume }: VolumeSliderProps) {
    const sliderRef = useRef<HTMLInputElement>(null);
    const [preVolume, setPreVolume] = useState(50);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.setProperty("--range-value", `${volume}%`);
        }
    }, [volume]);

    function mute() {
        if (volume === 0) {
            setVolume(preVolume);
        } else {
            setPreVolume(volume);
            setVolume(0);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    return (
        <div className="mr-5 group">
            <button onClick={mute} className="mr-1 relative" id="volumeBtn">
                {volume === 0 ? (
                    <VolumeOffIcon />
                ) : volume < 50 ? (
                    <VolumeDownIcon />
                ) : (
                    <VolumeUpIcon />
                )}
                <span className="absolute top-[-80%] left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:delay-300 transition-opacity duration-300">
                    {volume === 0 ? "Unmute" : "Mute"}
                </span>
            </button>
            <input
                type="range"
                id="volumeSlider"
                className="range-slider lg:w-[150px] md:w-[100px] sm:w-[50px] ::webkit-slider-runnable-track:hover: bg-spotify"
                value={volume}
                min="0"
                max="101"
                onChange={handleChange}
                ref={sliderRef}
            />
        </div>
    );
}
