"use client";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function PlayBtn() {
    return (
        <div className="absolute right-5 top-40">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("play");
                }}
                className="
            bg-spotify p-2 rounded-full active:scale-[1.1] ease-out opacity-0 transition 
            group-hover:-translate-y-5  group-hover:opacity-100 hover:scale-[1.05] "
            >
                <PlayArrowIcon className="text-black w-[40px] h-[40px]" />
            </button>
        </div>
    );
}
