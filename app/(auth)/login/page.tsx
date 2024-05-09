import Image from "next/image";
import spotifyLogo from "@/public/Spotify_Logo_CMYK_White.png";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/");
    }

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
            <LoginForm />
        </div>
    );
}
