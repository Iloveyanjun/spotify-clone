import Image from "next/image";

export default function SquareCard({
    name,
    image,
    description,
}: {
    name: string;
    image: any;
    description: string;
}) {
    return (
        <div className="mx-3 mt-5">
            <Image
                className="aspect-[548/840] rounded-lg w-[200px] h-[200px]"
                src={image}
                alt={name}
                width={200}
                height={200}
                draggable={false}
            />
            <h2 className="text-white mt-2 w-[200px] text-wrap">{name}</h2>
            <h4 className="text-type">{description}</h4>
        </div>
    );
}
