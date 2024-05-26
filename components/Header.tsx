"use client";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { usePathname } from "next/navigation";

export default function Header({children}: {children: React.ReactNode} ) {
    const pathname = usePathname();
    let style;
    if (pathname === "/signup" || pathname === "/login") {
        style =
            "hidden";
    } else {
        style =
            "mt-1 flex px-2 py-3 justify-between items-center bg-primary rounded-tl-md rounded-tr-md select-none";
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
            {children}
        </header>
    );
}
