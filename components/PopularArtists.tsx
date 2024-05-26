import RoundedCard from "@/components/RoundedCard";
import { searchArtists } from "@/apis/spotify";
import { createClient } from "@/utils/supabase/server";

export default async function PopularArtists() {
    const supabase = createClient();
    // 獲得本週熱門數據依照排名

    let { data: weeklyTopData, error } = await supabase
        .from("weeklyTopData")
        .select("artists");

    const searchMultipleAlbums = async (albums: string[]) => {
        const serachPromises = albums.map((name) => searchArtists(name));
        const result = await Promise.all(serachPromises);
        return result;
    };

    const artists = weeklyTopData?.map((o) => o.artists) || [];
    const data = await searchMultipleAlbums(artists);

    return (
        <div>
            <h1 className="font-bold ml-4 mb-2 text-3xl select-none">
                Popular artist
            </h1>
            <div className="flex ml-2 select-none w-scrren overflow-hidden flex-wrap ">
                {weeklyTopData?.map((artist) => (
                    <RoundedCard
                        key={weeklyTopData.indexOf(artist)}
                        id={data[weeklyTopData.indexOf(artist)].id}
                        name={artist.artists}
                        image={data[weeklyTopData.indexOf(artist)].image_url}
                        type="artist"
                    />
                ))}
            </div>
        </div>
    );
}
