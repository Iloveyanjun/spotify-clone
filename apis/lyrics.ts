"use server";

// 用spotify track id 獲取歌詞
export async function getLyrics(id: string) {
    const response = await fetch(`https://lyrix.vercel.app/getLyrics/${id}`);

    if (!response.ok) {
        console.log("NO");
    }
    const data = await response.json();
    return data;
}
