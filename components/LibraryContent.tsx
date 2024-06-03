import Image from "next/image";
import grogu from "@/public/grogu.jpg";

export default function LibraryContent({
    // album/playlist/track name
    name,
    id,
    artist,
    type,
}: {
    name: string;
    id: string;
    artist: string;
    type: string;
}) {
    let style;

    if (type === "artist") {
        style = "rounded-full";
    } else style = "rounded-md";

    return (
        <div className="flex p-2 rounded-md hover:bg-neutral-500/20">
            <Image
                className={`${style}`}
                src={grogu}
                width={48}
                height={48}
                alt="image"
            />
            <div className="pl-2">
                <div className="">{name}</div>
                <div className="text-sm text-inactive">{type}</div>
            </div>
        </div>
    );
}
