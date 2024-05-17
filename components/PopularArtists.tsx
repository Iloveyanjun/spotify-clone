import RoundedCard from "@/components/RoundedCard";
import { searchArtists } from "@/spotify-API/spotify";
import { createClient } from "@/utils/supabase/server";

export default async function PopularArtists() {
    const supabase = createClient();
    // 獲得本週熱門數據依照排名

    let { data: weeklyTopData, error } = await supabase
        .from("weeklyTopData")
        .select("artists");

    const imgs = [] as string[];
    for (let i = 0; weeklyTopData && i < weeklyTopData.length; i++) {
        const result = await searchArtists(weeklyTopData[i]?.artists);
        imgs.push(result);
    }

    return (
        <div>
            <h1 className="font-bold ml-4 mb-2 text-3xl select-none">Popular artist</h1>
            <div className="flex select-none w-scrren overflow-hidden flex-wrap ">
                {weeklyTopData?.map((artist) => (
                    <RoundedCard
                        key={weeklyTopData.indexOf(artist)}
                        name={artist.artists}
                        image={imgs[weeklyTopData.indexOf(artist)]}
                        type="artist"
                    />
                ))}
            </div>
        </div>
    );
}
