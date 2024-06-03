import dynamic from "next/dynamic";
const PlayBtn = dynamic(() => import("@/components/PlayBtn"), { ssr: false });

import Image from "next/image";
import Link from "next/link";
export default function RoundedCard({
    name,
    image,
    type,
    id,
}: {
    name: string;
    image: any;
    type: string;
    id: string;
}) {
    return (
        <Link
            href={{ pathname: `/artist/${id}` }}
            className="relative group p-3 mt-1 hover:bg-neutral-500/10 transition group"
        >
            <Image
                className="aspect-[548/840] rounded-full w-[200px] h-[200px] object-cover"
                src={image}
                alt={name}
                width={200}
                height={200}
                draggable={false}
                priority
            />
            <PlayBtn type="artist" id={id}/>
            <h2 className="text-white mt-2">{name}</h2>
            <h4 className="text-type">{type}</h4>
        </Link>
    );
}
