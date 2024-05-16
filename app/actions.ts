"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import puppeteer from "puppeteer";

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
// 爬取每周受歡迎的十個歌曲, 專輯, 藝術家
export async function getWeeklyData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.SPOTIFY_CHART_URL!);

    // 等待一些時間以確保頁面完全加載
    await page.waitForSelector("#__next");
    // 找到按鈕
    const buttons = await page.$$(".Button-sc-1dqy6lx-0");

    const buttonTypes: { [key: string]: string } = {
        3: "songs",
        4: "albums",
        5: "artists",
    };
    const albumData: { [key: string]: string[] } = {};

    for (const index in buttonTypes) {
        const buttonIndex = parseInt(index);
        const type = buttonTypes[index];
        // chart.spotify.com
        // index 3:songs, 4:albums, 5:artists
        await buttons[buttonIndex].click();

        // 使用evaluate函數從網頁中提取專輯名稱
        const albumNames = await page.evaluate(() => {
            const albumElements = document.querySelectorAll(
                "#__next > div > div > main > div > div > section > div > ol > div > li > div > p"
            );
            const albums = Array.from(albumElements).map((album) =>
                album.textContent?.trim()
            );
            return albums.filter((album) => album !== undefined) as string[];
        });

        albumData[type] = albumNames;
    }

    await browser.close();
    // 處理數據寫入database
    const supabase = createClient();
    const { songs, albums, artists } = albumData;

    for (let i = 0; i < songs.length; i++) {
        const { error } = await supabase.from("weeklyTopData").insert({
            songs: `${songs[i]}`,
            albums: `${albums[i]}`,
            artists: `${artists[i]}`,
        });
    }
}
