// 使用youtube api搜尋歌曲影片ID
// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const search = searchParams.get("search");

//     const res = await fetch(
//         `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${search}&type=video&videoEmbeddable=true&maxResults=1`
//     );
//     const data = await res.json();
//     const videoId = data.items[0].id.videoId;
//     return Response.json({ videoId });
// }

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    if (!search) {
        return new Response(
            JSON.stringify({ error: "Search query is required" }),
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${search}&type=video&videoEmbeddable=true&maxResults=1`
        );

        if (!res.ok) {
            throw new Error(`YouTube API returned an error: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.items || data.items.length === 0) {
            return new Response(JSON.stringify({ error: "No videos found" }), {
                status: 404,
            });
        }

        const videoId = data.items[0]?.id?.videoId;

        if (!videoId) {
            return new Response(
                JSON.stringify({ error: "Video ID not found" }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify({ videoId }), { status: 200 });
    } catch (error) {
        console.error("Error fetching data from YouTube API:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}
