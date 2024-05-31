import { getPlaylist } from "@/apis/spotify";
import { getLikedTracks, getUser } from "@/app/actions";
import { redirect } from "next/navigation";
import PlaylistTrack from "./PlaylistTrack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default async function PlaylistTrackContainer({ id }: { id: string }) {
    let data;
    const user = await getUser();
    if (!user) {
        redirect("/login");
    }

    if (id) {
        data = await getPlaylist(id);
    } else {
        data = await getLikedTracks(user.id);
    }

    return (
        <div>
            <div className="flex mx-3 text-sm justify-between py-2 select-none text-inactive">
                <div className="flex w-[30%]">
                    <div className="mx-6">#</div>
                    <div className="ml-2">Title</div>
                </div>
                <div className=" w-[20%] ">Album</div>
                <div className="w-[20%]">Date added</div>
                <div className="w-[10%] mr-10">
                    <AccessTimeIcon className="text-xl"/>
                </div>
            </div>
            <div className=" flex justify-center">
                <hr className="w-[98%] bg-inactive mb-3 h-[1px] border-none" />
            </div>
            {Array.isArray(data) &&
                data.map((track, index) => (
                    <PlaylistTrack
                        key={track.id}
                        name={track.name}
                        index={index}
                        id={track.id}
                        duration={track.duration}
                        artists={track.artists}
                        addedAt={track.addedAt}
                        album={track.album}
                        cover={track.cover}
                    />
                ))}
        </div>
    );
}
