"use client";

import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

export default function Lyrics({
    words,
    isHighlighted,
}: {
    words: string;
    isHighlighted: boolean;
}) {
    return (
        <div
            className={`text-5xl ${
                poppins.className
            } py-10 px-20 text-inactive font-bold text-center transition origin-center ease-in-out  text-wrap whitespace-normal ${
                isHighlighted ? "text-white scale-125" : "text-inactive/20"
            }`}
        >
            {words}
        </div>
    );
}
