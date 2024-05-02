import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="flex flex-col flex-grow  ml-2 h-screen max-w-60">
            <div className="bg-[#262626] flex flex-col rounded-md px-3 py-2 mt-2">
                <Link href={"/"} className="flex items-center mb-2">
                    <HomeIcon fontSize="small" />
                    <p className="ml-3 text-[12px] font-bold">首頁</p>
                </Link>
                <Link href={"/search"} className="flex items-center">
                    <SearchIcon fontSize="small" className="text-[#B2B2B2]" />
                    <p className="ml-3 text-[12px] font-bold text-[#B2B2B2]">
                        搜尋
                    </p>
                </Link>
            </div>
            <div className="bg-[#262626] flex flex-col  rounded-md px-3 py-2 mt-2 flex-grow">
                <div>
                    <LibraryMusicIcon
                        fontSize="small"
                        className="text-[#B2B2B2]"
                    />
                    <span className="ml-3 text-[12px] text-[#B2B2B2]">
                        你的音樂庫
                    </span>
                </div>
                <div>List of songs</div>
            </div>
        </div>
    );
}
