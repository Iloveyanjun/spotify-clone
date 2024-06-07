import AlbumHeader from "@/components/AlbumHeader";
import TracksContainer from "@/components/TracksContainer";
import { getAccessToken } from "@/apis/spotify";
import type { Metadata, ResolvingMetadata } from "next";
type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id;

    // fetch data
    const token = await getAccessToken();
    const album = await fetch(
        `https://api.spotify.com/v1/albums/${id}?market=US`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    ).then((res) => res.json());
    const artist = album.artists[0].name;

    return {
        title: `${album.name} - Album by ${artist}`,
    };
}

export default async function AlbumPage({ params, searchParams }: Props) {
    const { id } = params;
    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[100px]">
            <AlbumHeader id={id} />
            <TracksContainer id={id} />
        </div>
    );
}
