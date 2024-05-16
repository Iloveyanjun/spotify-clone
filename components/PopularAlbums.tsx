import { getAlbumCover, getAlbumsID } from "@/spotify-API/spotify";
import { createClient } from "@/utils/supabase/server";
import SquareCard from "./SquareCard";

type Album = {
    albumName: string;
    artist: string;
    cover: string;
};

export default async function PopularAlbums() {
    const supabase = createClient();

    let { data: weeklyTopData, error } = await supabase
        .from("weeklyTopData")
        .select("albums");
    // 獲取每周受歡迎的十個專輯的ID
    const ids = [] as string[];
    for (let i = 0; weeklyTopData && i < weeklyTopData.length; i++) {
        const result = await getAlbumsID(weeklyTopData[i]?.albums);
        ids.push(result);
    }

    // 獲取每周受歡迎的十個專輯的封面
    const data: Album[] = [];
    for (let i = 0; i < ids.length; i++) {
        const result = await getAlbumCover(ids[i]);
        data.push(result);
    }

    return (
        <div>
            <h1 className="font-bold ml-4 mb-2 mt-10 text-3xl">Popular Albums</h1>
            <div className="flex w-scrren overflow-hidden flex-wrap ">
                {data.map((o) => (
                    <SquareCard
                        key={data.indexOf(o)}
                        name={o.albumName}
                        image={o.cover}
                        description={o.artist}
                    />
                ))}
            </div>
        </div>
    );
}
