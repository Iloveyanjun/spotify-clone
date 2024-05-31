// 使用youtube api搜尋歌曲影片ID
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    console.log(search);
    
    const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${search}&type=video&videoEmbeddable=true&maxResults=1`
    );
    const data = await res.json();
    const videoId = data.items[0].id.videoId;
    return Response.json({ videoId });
}
