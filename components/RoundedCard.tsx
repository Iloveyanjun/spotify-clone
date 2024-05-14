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
        <div>
            <Image
                className="mb-1 mr-3 rounded-full h-[100px]"
                src={image}
                width={100}
                height={100}
                alt="artist"
            />
            <h2 className="text-red-500">{name}</h2>
            <h4 className="text-blue-500">{type}</h4>
        </div>
    );
}
