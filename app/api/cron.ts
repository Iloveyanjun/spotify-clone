import { createClient } from "@/utils/supabase/server";
import puppeteer from "puppeteer";
import { revalidatePath } from "next/cache";

// 爬取每周受歡迎的十個歌曲, 專輯, 藝術家
export async function GET(request: Request) {
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

    if (songs && albums && artists) {
        for (let i = 0; i < songs.length; i++) {
            // 先查找現有數據是否存在
            const { data, error: selectError } = await supabase
                .from("weeklyTopData")
                .select("id")
                .eq("songs", songs[i])
                .single();

            if (selectError && selectError.code !== "PGRST116") {
                console.error(`Error fetching data: ${selectError.message}`);
                continue;
            }

            if (data) {
                // 如果存在，則更新數據
                const { error: updateError } = await supabase
                    .from("weeklyTopData")
                    .update({
                        albums: albums[i],
                        artists: artists[i],
                    })
                    .eq("id", data.id);

                if (updateError) {
                    console.error(
                        `Error updating data: ${updateError.message}`
                    );
                }
            } else {
                // 如果不存在，則插入新數據
                const { error: insertError } = await supabase
                    .from("weeklyTopData")
                    .insert({
                        songs: songs[i] || null,
                        albums: albums[i] || null,
                        artists: artists[i] || null,
                    });

                if (insertError) {
                    console.error(
                        `Error inserting data: ${insertError.message}`
                    );
                }
            }
        }
    } else {
        console.error("Error: Missing data for songs, albums, or artists.");
    }
    revalidatePath("/");
    return new Response(JSON.stringify(albumData), {
        headers: { "Content-Type": "application/json" },
    });
}
