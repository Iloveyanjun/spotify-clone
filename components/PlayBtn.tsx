"use client";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getAlbum, getArtistTopTracks } from "@/apis/spotify";
import { useTrackContext } from "@/context/player-context";
import { Artist, Track } from "@/lib/types";

export default function PlayBtn({
    type,
    id,
    on,
    size = "large",
}: {
    type: string;
    id: string;
    on: string;
    size: "large" | "medium" | "small";
}) {
    let style;
    let container;
    if (on !== "card") {
        style = "transition";
        container = "flex";
    } else {
        container = "absolute right-5 top-40 z-10";
        if (size === "medium") {
            container = "absolute right-[10px] top-[120px] z-10";
        }
        style =
            "ease-out opacity-0 transition group-hover:-translate-y-5  group-hover:opacity-100";
    }
    const {
        trackIndex,
        setSpotifyTrackID,
        setCurrentTrack,
        setTrackImage,
        setTrackName,
        setArtists,
        setTrackIndex,
    } = useTrackContext();

    const fetchYoutubeID = async (track: {
        name: string;
        artists: Artist[];
        // spotify id
        id: string;
    }) => {
        const dudes = track.artists.map((a: Artist) => a.name).join(", ");
        const search = `${track.name} ${dudes} audio`;
        const res = await fetch(`/api?search=${search}`);
        const data = await res.json();
        return data;
    };

    const fetchAndSet = async (tracks: Track[]) => {
        // 把所有spotify提供的每首track的id, 封面, 名稱, 演出者存進context
        setSpotifyTrackID(tracks.map((track) => track.id));
        setTrackImage(tracks.map((track) => track.cover));
        setTrackName(tracks.map((track) => track.name));
        setArtists(tracks.map((track) => track.artists));
        setTrackIndex(0);
        // 使用youtube api搜尋每首歌曲的影片id
        const youtubeID = await fetchYoutubeID(tracks[trackIndex]);
        if (youtubeID.videoId) {
            setCurrentTrack([]);
            setCurrentTrack((preCurrentTrack) => [
                ...preCurrentTrack,
                youtubeID.videoId,
            ]);
        } else console.log("exceed youtube api limit");
    };

    const handlePlay = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (type === "artist") {
                const data = await getArtistTopTracks(id);
                // 把data中的每個track 使用youtube api 並行搜尋 id 並播放
                await fetchAndSet(data.topTracks);
            } else if (type === "album") {
                const data = await getAlbum(id);
                await fetchAndSet(data.tracks);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`${container}`}>
            <button
                onClick={handlePlay}
                className={`bg-spotify p-2 rounded-full active:scale-[1.1] hover:scale-[1.05] ${style}`}
            >
                <PlayArrowIcon className={`text-black`} fontSize={size} />
            </button>
        </div>
    );
}
