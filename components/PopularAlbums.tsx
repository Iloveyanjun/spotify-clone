import { getAlbumsID, getSeveralAlbums } from "@/spotify-API/spotify";
import { createClient } from "@/utils/supabase/server";
import SquareCard from "./SquareCard";

export default async function PopularAlbums() {
    const supabase = createClient();

    let { data: weeklyTopData, error } = await supabase
        .from("weeklyTopData")
        .select("albums");
    // 獲取每周受歡迎的十個專輯的ID
    let ids: string = "";
    for (let i = 0; weeklyTopData && i < weeklyTopData.length; i++) {
        const result = await getAlbumsID(weeklyTopData[i]?.albums);
        ids += result + ",";
    }
    // 獲取每周受歡迎的十個專輯的封面
    const data = await getSeveralAlbums(ids);

    return (
        <div>
            <h1 className="font-bold ml-4 mb-2 mt-10 text-3xl select-none">
                Popular Albums
            </h1>
            <div className="flex w-scrren select-none overflow-hidden flex-wrap ">
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
