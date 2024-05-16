import PopularAlbums from "@/components/PopularAlbums";
import PopularArtists from "@/components/PopularArtists";

export default async function HomePage() {

    return (
        <div className="px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <PopularArtists />
            <PopularAlbums />
        </div>
    );
}
