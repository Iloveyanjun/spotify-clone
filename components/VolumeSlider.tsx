"use client";

import React, { useState, useEffect, useRef } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

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
            <button onClick={mute} className="mr-1" id="volumeBtn">
                <VolumeUpIcon />
            </button>
            <input
                type="range"
                id="volumeSlider"
                className="range-slider ::webkit-slider-runnable-track:hover: bg-spotify"
                value={volume}
                min="-1"
                max="101"
                onChange={handleChange}
                ref={sliderRef}
            />
        </div>
    );
}
