import { getArtistTopTracks } from "@/apis/spotify";
import ArtistTopTrack from "./ArtistTopTrack";

export default async function ArtistHeader({ id }: { id: string }) {
    const data = await getArtistTopTracks(id);
    return (
        <div className="flex flex-col justify-end ">
            <h1 className="text-8xl font-bold pt-52 pb-16 px-5  bg-gradient-to-b from-neutral-500 to-primary ">
                {data.artist}
            </h1>
            <div className="px-6">
                <div className="font-bold text-2xl mb-4">熱門</div>
                {data.topTracks.map(
                    ({ name, id, duration_ms, cover, artists }, index) => (
                        <ArtistTopTrack
                            key={index}
                            index={index}
                            name={name}
                            id={id}
                            image={cover}
                            duration={duration_ms}
                            mainArtist={data.artist}
                            artists={artists}
                        />
                    )
                )}
            </div>
        </div>
    );
}
