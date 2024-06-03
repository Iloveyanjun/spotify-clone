"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getAccessToken } from "@/apis/spotify";
import { Artist } from "@/lib/types";

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

// 獲得目前登入的用戶 如果沒有登入會返回null
export async function getUser() {
    const supabase = createClient();
    // check if user is logged in
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

// 儲存spotifyID到supabase
export async function addLikedTrack(userID: string, trackID: string) {
    const supabase = createClient();
    console.log(userID);

    const { data, error } = await supabase
        .from("user_favorite")
        .insert({ user_id: userID, track_id: trackID })
        .select();

    if (error) {
        console.log(error);
    }
    revalidatePath("/collection/tracks");
}

// 從supabase刪除喜歡的歌曲
export async function removeLikedTrack(userID: string, trackID: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("user_favorite")
        .delete()
        .match({ user_id: userID, track_id: trackID });

    if (error) {
        console.log(error);
    }
       revalidatePath("/collection/tracks");

}


// 檢查歌曲是否已經被添加到喜歡列表 如果已經添加返回true 否則返回false
export async function checkTrackLiked(userID: string, trackID: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("user_favorite")
        .select("user_id, track_id")
        .match({ user_id: userID, track_id: trackID });

    if (error) {
        console.log(error);
        return false;
    }
    return data.length > 0;
}

// 獲取用戶喜歡的歌曲
export async function getLikedTracks(userID: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("user_favorite")
        .select("track_id, created_at")
        .match({ user_id: userID });

    if (error) {
        console.log(error);
    }
    // 什麼時候添加喜歡歌曲
    let created_at: string[] = [];
    // query是一個用逗號分隔的字符串 (ID1,ID2,ID3 ...)
    let query = "";
    if (data) {
        data.forEach((content) => {
            query += content.track_id + ",";
            created_at.push(content.created_at);
        });
    }
    // 刪除最後一個逗號, 避免spotifyAPI返回多一個空值
    query = query.slice(0, -1);
    // 使用query搜尋歌曲
    const token = await getAccessToken();
    const res = await fetch(
        `https://api.spotify.com/v1/tracks/?market=US&ids=${query}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );

    const tracksData = await res.json();
    // 將數據轉換為我們需要的格式
    let playlistData: {
        index: number;
        name: string;
        id: string;
        cover: string;
        duration: number;
        addedAt: string;
        album: { name: string; id: string };
        artists: { name: string; id: string }[];
    }[] = [];

    // 如果沒有歌曲返回空數據
    if (!tracksData.tracks) return playlistData;

    // 將數據轉換為我們需要的格式
    tracksData.tracks.forEach((track: any, index: number) => {
        let artists: { name: string; id: string }[] = [];
        track.artists.forEach((a: Artist) => {
            artists.push({ name: a.name, id: a.id });
        });
        playlistData.push({
            index: index,
            name: track.name,
            id: track.id,
            cover: track.album.images[0].url,
            duration: track.duration_ms,
            addedAt: created_at[index],
            album: { name: track.album.name, id: track.album.id },
            artists: artists,
        });
    });

    return playlistData;
}
