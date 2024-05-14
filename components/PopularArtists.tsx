import RoundedCard from "@/components/RoundedCard";
import { searchArtists } from "@/spotify-API/spotify";
import { createClient } from "@/utils/supabase/server";

export default async function PopularArtists() {
    const supabase = createClient();
    // 獲得本週熱門數據依照排名

    let { data: weeklyTopData, error } = await supabase
        .from("weeklyTopData")
        .select("artists");
    console.log("Supabase" + weeklyTopData);
    const imgs = [] as string[];
    for (let i = 0; weeklyTopData && i < weeklyTopData.length; i++) {
        const result = await searchArtists(weeklyTopData[i]?.artists);
        imgs.push(result);
    }

    console.log(imgs);

    return (
        <div>
            <h1 className="font-bold mb-2">Popular artist</h1>
            <div className="flex w-scrren overflow-hidden ">
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
