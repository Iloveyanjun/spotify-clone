

export async function getAccessToken() {
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
            "grant_type=client_credentials&client_id=" +
            process.env.SPOTIFY_CLIENT_ID +
            "&client_secret=" +
            process.env.SPOTIFY_CLIENT_SECRET,
    });
    const data = await res.json();


    return data;
}
// 用藝術家名字搜尋並回傳藝術家圖片
export async function searchArtists(name: string) {
    const token = await getAccessToken();
    const buh = await fetch(
        `https://api.spotify.com/v1/search?q=${name}&type=artist`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    const data = await buh.json();
    const image_url = data.artists.items[0].images[0].url;
    return image_url;
}
// 搜尋專輯並回傳專輯ID
export async function getAlbumsID(name: string) {
    const token = await getAccessToken();
    const buh = await fetch(
        `https://api.spotify.com/v1/search?type=album&q=${name}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    const data = await buh.json();

    return data.albums.items[0].id;
}

// 使用專輯ID獲取專輯圖片
export async function getAlbumCover(albumID: string) {
    const token = await getAccessToken();
    const response = await fetch(
        `https://api.spotify.com/v1/albums/${albumID}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    const data = await response.json();
    const artist = data.artists[0].name;
    const cover = data.images[0].url;
    const albumName = data.name;

    const result = { albumName, artist, cover };
    // 回傳專輯名稱, 藝術家, 專輯封面的object
    return result;
}
