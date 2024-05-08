import Image from "next/image";
import spotifyLogo from "@/public/Spotify_Logo_CMYK_White.png";
import Link from "next/link";
import { login } from "@/app/actions";

export default function LoginPage() {
    return (
        <div className="flex flex-col bg-gradient-to-b from-[#2a2a2a] from-10% to to-black to-90% h-screen p-0 mx-[-4px]">
            {/* Header */}
            <div className="h-fit bg-[#121212] py-8 px-12">
                <Link href={"/"}>
                    <Image
                        src={spotifyLogo}
                        alt="Spotify Logo"
                        width={117}
                        height={40}
                    />
                </Link>
            </div>
            {/* Form */}
            <div className="flex flex-col justify-center self-center items-center bg-[#121212] py-10 w-[730px] mt-8 rounded-md">
                <h1 className="font-bold text-3xl my-5">
                    Log in to Fake Spotify
                </h1>
                <div className="w-[70%]">
                    <hr className="h-px my-8  border-0 dark:bg-[#2a2a2a]" />
                </div>
                <form action={login}>
                    <div className="flex flex-col font-bold mb-3">
                        <label>Email</label>
                        <input
                            type="text"
                            className="w-[324px] rounded-sm px-4 py-3 mt-2 bg-secondary border border-gray-500 hover:border-white transition-[0.3s]"
                            placeholder="Email"
                            name="email"
                        />
                    </div>
                    <div className="flex flex-col font-bold">
                        <label>Password</label>
                        <input
                            type="text"
                            className="w-[324px] rounded-sm px-4 py-3 mt-2 bg-secondary border border-gray-500 hover:border-white transition-[0.3s]"
                            placeholder="Password"
                            name="password"
                        />
                    </div>
                    <button className="rounded-full bg-spotify text-black py-3 mt-4 font-bold hover:bg-green-500 w-[324px]">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}
