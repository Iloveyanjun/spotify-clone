import Image from "next/image";
import Link from "next/link";

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
            className="flex flex-col hover:bg-neutral-500/10 rounded-md p-3 w-[170px]"
        >
            <div>
                <Image
                    src={image}
                    alt={name}
                    width={150}
                    height={150}
                    className="rounded-md"
                />
                <h3 className="flex ">{name}</h3>
                <div className="flex text-inactive text-sm">
                    <p>{year}</p>
                    <p className="mx-1">•</p>
                    <p>{type}</p>
                </div>
            </div>
        </Link>
    );
}
