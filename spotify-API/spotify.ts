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

type Album = {
    albumName: string;
    artist: string;
    cover: string;
};

export async function getSeveralAlbums(albumIDs: string) {
    const token = await getAccessToken();
    const response = await fetch(
        `https://api.spotify.com/v1/albums/?ids=${albumIDs}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    const data = await response.json();
    const array = data.albums;
    let albums = [] as Album[];
    // console.log(array);
    for (let i = 0; i < array.length-1; i++) {
        const artist = array[i].artists[0].name;
        const albumName = array[i].name;
        const cover = array[i].images[0].url;
        albums.push({ albumName, artist, cover });
    }
    return albums;
}
