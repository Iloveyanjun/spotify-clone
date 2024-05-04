"use client";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    let style;
    if (pathname === "/signup") {
        style =
            "mt-1 flex px-2 py-2 justify-between items-center bg-primary rounded-tl-md rounded-tr-md hidden";
    } else {
        style =
            "mt-1 flex px-2 py-2 justify-between items-center bg-primary rounded-tl-md rounded-tr-md";
    }

    return (
        <header className={style}>
            <div className="">
                <ArrowBackIosNewIcon
                    className="bg-black rounded-full p-2 mr-2"
                    fontSize="large"
                />
                <ArrowForwardIosIcon
                    className="bg-black rounded-full p-2"
                    fontSize="large"
                />
            </div>
            {/* 登入和註冊按鈕 */}
            <div>
                <Link href="/signup">
                    <button className="text-inactive py-2 mr-8 hover:text-white font-bold hover:scale-[1.05]">
                        Sign up
                    </button>
                </Link>
                <Link href="/login">
                    <button className="rounded-full bg-white text-black px-8 py-3 font-bold hover:scale-[1.05]">
                        登入
                    </button>
                </Link>
            </div>
        </header>
    );
}
