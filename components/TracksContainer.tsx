import { getAlbum } from "@/apis/spotify";
import AlbumTrack from "./AlbumTrack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayBtn from "./PlayBtn";
// import dynamic from "next/dynamic";
// const PlayBtn = dynamic(() => import("@/components/PlayBtn"), { ssr: false });

export default async function TracksContainer({ id }: { id: string }) {
    const data = await getAlbum(id);

    return (
        <div>
            <div className="mx-6 pb-6">
                <PlayBtn id={id} type="album" on="album" size="large" />
            </div>
            <div className="flex mx-3 text-sm justify-between py-2 select-none text-inactive">
                <div className="flex w-[30%]">
                    <div className="mx-6">#</div>
                    <div className="ml-2">Title</div>
                </div>
                <div className="w-[70px]">
                    <AccessTimeIcon className="text-xl" />
                </div>
            </div>
            <div className=" flex justify-center">
                <hr className="w-[98%] bg-inactive mb-3 h-[1px] border-none" />
            </div>
            <div>
                {data.tracks.map((track, index) => (
                    <AlbumTrack
                        key={track.id}
                        id={track.id}
                        index={index}
                        name={track.name}
                        artists={track.artists}
                        duration={track.duration}
                        cover={data.cover}
                    />
                ))}
            </div>
        </div>
    );
}
