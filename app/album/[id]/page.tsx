import AlbumHeader from "@/components/AlbumHeader";
import TracksContainer from "@/components/TracksContainer";

export default async function AlbumPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[100px]">
            <AlbumHeader id={id} />
            <TracksContainer id={id} />
        </div>
    );
}
