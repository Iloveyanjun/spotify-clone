import Image from "next/image";

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
                src="https://i.scdn.co/image/ab6761610000e5eb6e835a500e791bf9c27a422a"
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
