import dynamic from "next/dynamic";
const PlayBtn = dynamic(() => import("@/components/PlayBtn"), { ssr: false });

import Image from "next/image";
import Link from "next/link";

export default function SquareCard({
    name,
    image,
    description,
    // spotify album id
    id,
}: {
    name: string;
    image: any;
    description: string;
    id: string;
}) {
    return (
        <Link
            href={`/album/${id}`}
            className="relative group p-3 mt-1 hover:bg-neutral-500/10 transition"
        >
            <Image
                className="aspect-[548/840] rounded-lg w-[200px] h-[200px]"
                src={image}
                alt={name}
                width={200}
                height={200}
                draggable={false}
            />
            <PlayBtn type="album" id={id} />
            <h2 className="text-white mt-2 w-[200px] text-wrap">{name}</h2>
            <h4 className="text-type">{description}</h4>
        </Link>
    );
}
