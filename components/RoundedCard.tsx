import Image from "next/image";

export default function RoundedCard({
    name,
    image,
    type,
}: {
    name: string;
    image: any;
    type: string;
}) {
    return (
        <div className="mx-3 mt-5">
            <Image
                className="aspect-[548/840] rounded-full w-[200px] h-[200px]"
                src={image}
                alt={name}
                width={200}
                height={200}
                draggable={false}
            />
            <h2 className="text-white mt-2">{name}</h2>
            <h4 className="text-type">{type}</h4>
        </div>
    );
}
