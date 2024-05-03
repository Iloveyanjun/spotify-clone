import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Header() {
    return (
        <header className="mt-1 flex px-2 py-2 justify-between items-center bg-primary rounded-tl-md rounded-tr-md">
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
                <button className="text-inactive py-2 mr-8 hover:text-white font-bold hover:scale-[1.05]">
                    Sign up
                </button>
                <button className="rounded-full bg-white text-black px-8 py-3 font-bold hover:scale-[1.05]">
                    登入
                </button>
            </div>
        </header>
    );
}
