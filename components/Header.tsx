"use client";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { usePathname } from "next/navigation";

export default function Header({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    let style;
    if (pathname === "/signup" || pathname === "/login") {
        style = "hidden";
    } else {
        style =
            "mt-1 flex px-2 py-3 justify-end items-center bg-primary rounded-tl-md rounded-tr-md select-none";
    }

    return (
        <header className={style}>
            {/* 登入和註冊按鈕 */}
            {children}
        </header>
    );
}
