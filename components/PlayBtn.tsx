"use client";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getAlbum, getArtistTopTracks } from "@/apis/spotify";
import { useTrackContext } from "@/context/player-context";
import { Artist } from "@/lib/types";

export default function PlayBtn({ type, id }: { type: string; id: string }) {
    const {
        setSpotifyTrackID,
        setCurrentTrack,
        setTrackImage,
        setTrackName,
        setArtists,
        setTrackIndex,
    } = useTrackContext();

    const fetchYoutubeID = async (
        tracks: {
            name: string;
            artists: Artist[];
            // spotify id
            id: string;
        }[]
    ) => {
        const fetchPromises = tracks.map(async (track) => {
            const dudes = track.artists.map((a: Artist) => a.name).join(", ");
            const search = `${track.name} ${dudes} audio`;
            const res = await fetch(`/api?search=${search}`);
            const data = await res.json();
            return data;
        });
        const result = await Promise.all(fetchPromises);
        return result;
    };

    const fetchAndSet = async (
        tracks: { name: string; artists: Artist[]; id: string; cover: string }[]
    ) => {
        const youtubeIDs = await fetchYoutubeID(tracks);
        setSpotifyTrackID(tracks.map((track) => track.id));
        setCurrentTrack(youtubeIDs.map((o) => o.videoId));
        setTrackImage(tracks.map((track) => track.cover));
        setTrackName(tracks.map((track) => track.name));
        setArtists(tracks.map((track) => track.artists));
        setTrackIndex(0);
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
        <div className="absolute right-5 top-40">
            <button
                onClick={handlePlay}
                className="
            bg-spotify p-2 rounded-full active:scale-[1.1] ease-out opacity-0 transition 
            group-hover:-translate-y-5  group-hover:opacity-100 hover:scale-[1.05] "
            >
                <PlayArrowIcon className="text-black w-[40px] h-[40px]" />
            </button>
        </div>
    );
}
