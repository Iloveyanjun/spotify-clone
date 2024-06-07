import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const PlayBtn = dynamic(() => import("@/components/PlayBtn"), { ssr: false });

export default function ProfileDiscography({
    // albumID,
    id,
    name,
    image,
    releaseDate,
    type,
}: {
    id: string;
    name: string;
    image: string;
    releaseDate: string;
    type: string;
}) {
    const year = releaseDate.split("-")[0];

    return (
        <Link
            href={`/${type}/${id}`}
            className="relative group flex flex-col hover:bg-neutral-500/10 rounded-md p-3 w-[170px]"
        >
            <div className="relative">
                <Image
                    className="rounded-md object-cover"
                    src={image}
                    alt={name}
                    width={150}
                    height={150}
                    draggable={false}
                />
                <PlayBtn type={type} id={id} on="card" size="medium" />
                <h3
                    className="block min-w-0 text-ellipsis text-nowrap overflow-hidden"
                    title={name}
                >
                    {name}
                </h3>
                <div className="flex text-inactive text-sm">
                    <p>{year}</p>
                    <p className="mx-1">•</p>
                    <p>{type}</p>
                </div>
            </div>
        </Link>
    );
}
