import ArtistAlbums from "@/components/ArtistAlbums";
import ArtistHeader from "@/components/ArtistHeader";
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
    const artist = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token.access_token,
        },
    }).then((res) => res.json());

    return {
        title: artist.name,
    };
}

export default async function ArtistPage({ params, searchParams }: Props) {
    const { id } = params;

    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[200px]">
            <ArtistHeader id={id} />
            <ArtistAlbums artistID={id} />
        </div>
    );
}
