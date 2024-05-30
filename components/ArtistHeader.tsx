import { getArtist, getArtistTopTracks } from "@/apis/spotify";
import ArtistTopTrack from "./ArtistTopTrack";
import Image from "next/image";

export default async function ArtistHeader({ id }: { id: string }) {
    const data = await getArtistTopTracks(id);
    const artistImg = await getArtist(id);

    return (
        <div className="flex flex-col justify-end">
            <div className="flex text-8xl font-bold pt-52 pb-14 px-5  bg-gradient-to-b from-neutral-500 to-primary ">
                <Image
                    src={artistImg}
                    className="rounded-full mr-5 object-cover w-[150px] h-[150px]"    
                    alt="image"
                    width={150}
                    height={150}
                />
                <h1 className="self-end">{data.artist}</h1>
            </div>
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
