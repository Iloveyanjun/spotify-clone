import { logout } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AuthBtns() {
    const supabase = createClient();
    // check if user is logged in
    const {
        data: { user },
    } = await supabase.auth.getUser();
    

    // if user is logged in, hide the login and signup buttons
    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={logout}>
                <button className="py-2 px-4 rounded-md no-underline bg-spotify hover:bg-green-300 cursor-pointer">
                    Logout
                </button>
            </form>
        </div>
    ) : (
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
    );
}
