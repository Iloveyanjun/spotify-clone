"use server";

// 使用youtube api搜尋歌曲影片ID
export async function searchVideoId(search: string) {
    const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${search}&type=video&videoEmbeddable=true&maxResults=1`
    );
    try {
        if (!res.ok) {
            throw new Error(`YouTube API returned an error: ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);

        return data;
    } catch (error) {
        // 超過youtube api每日上限
        console.log("exceed youtube api limit");
    }
}
