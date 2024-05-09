"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(user: unknown) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = user as { email: string; password: string };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: error.message };
    }
    // revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(user: unknown) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = user as { email: string; password: string };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        console.log(error);

        redirect("/error");
    }
    console.log("User signed up successfully!");
    // revalidatePath("/", "layout");
    redirect("/");
}

export async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    return redirect("/");
}
