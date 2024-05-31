import { getPlaylist } from "@/apis/spotify";
import like from "@/public/liked-songs-300.png";
import Image from "next/image";

// playlist id
export default async function PlaylistHeader({ id }: { id: string }) {
    let data;
    if (id) {
        data = await getPlaylist(id);
    } else {
        data = null;
    }

    return (
        <div className="flex bg-gradient-to-b from-neutral-400 to-primary h-auto pt-14 pb-10">
            <Image
                className="mx-5 rounded-md shadow-2xl"
                src={like}
                alt="img"
                width={200}
                height={200}
            />
            <div className="flex flex-col justify-end">
                <div className="mt-10 font-bold">Playlist</div>
                <div className="text-[48px] font-bold">
                    {data?.name || "已按讚的歌曲"}
                </div>
            </div>
        </div>
    );
}
