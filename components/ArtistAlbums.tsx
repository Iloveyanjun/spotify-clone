import { getArtistAlbums } from "@/apis/spotify";
import ProfileDiscography from "./ProfileDiscography";

export default async function ArtistAlbums({ artistID }: { artistID: string }) {
    const data = await getArtistAlbums(artistID);

    return (
        <div className="flex flex-col px-6">
            <div className="text-2xl font-bold my-4">專輯</div>
            <div className="flex flex-wrap">
                {data.map((album) => (
                    <ProfileDiscography
                        key={album.albumID}
                        id={album.albumID}
                        name={album.albumName}
                        image={album.albumImage}
                        releaseDate={album.albumReleaseDate}
                        type={album.type}
                    />
                ))}
            </div>
        </div>
    );
}
