import ArtistAlbums from "@/components/ArtistAlbums";
import ArtistHeader from "@/components/ArtistHeader";

export default async function ArtistPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[200px]">
            <ArtistHeader id={id} />
            <ArtistAlbums artistID={id} />
        </div>
    );
}
