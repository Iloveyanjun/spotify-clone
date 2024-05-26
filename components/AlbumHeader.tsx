import { getAlbum } from "@/apis/spotify";
import Image from "next/image";
import Link from "next/link";

export default async function AlbumHeader({ id }: { id: string }) {
    const data = await getAlbum(id);

    let totalTime = 0;
    data.tracks.forEach((t) => {
        totalTime += t.duration;
    });
    const hour = Math.floor(totalTime / 1000 / 60 / 60);
    const mins = Math.floor((totalTime / 1000 / 60 / 60 - hour) * 60);
    const secs = Math.floor(
        ((totalTime / 1000 / 60 / 60 - hour) * 60 - mins) * 60
    );
    // 如果不到一小時 就顯示幾分幾秒，否則顯示幾小時幾分
    const duration =
        hour > 0 ? `${hour} 小時 ${mins} 分鐘` : `${mins} 分鐘 ${secs} 秒`;

    return (
        // pb-5
        <div className="flex bg-gradient-to-b from-neutral-400 to-primary h-auto pt-14 pb-10">
            <Image
                className="mx-5 rounded-md shadow-2xl"
                src={data.cover}
                alt="img"
                width={200}
                height={200}
            />
            <div className="flex flex-col justify-end">
                <div className="mt-10 font-bold">專輯</div>
                <div className="text-[48px] font-bold">{data.name}</div>

                <div className="flex text-sm mb-1 font-bold">
                    {data.artist.map((artist, index) => (
                        <div key={index} className="flex">
                            <Link
                                href={`/artist/${artist.id}`}
                                className="hover:underline"
                            >
                                {artist.name}
                            </Link>
                            {index === data.artist.length - 1 ? null : (
                                <div className="mx-1">•</div>
                            )}
                        </div>
                    ))}
                    <div className="mx-1">•</div>
                    <div>{data.releaseDate.split("-")[0]}</div>
                    <div className="mx-1">•</div>
                    <div>
                        {data.totalTracks} 首歌曲, {duration}
                    </div>
                </div>
            </div>
        </div>
    );
}
