import {
    RoundCardsSkeleton,
    SquareCardsSkeleton,
} from "@/components/Skeletons";

export default function Loading() {
    return (
        <div className="px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <h1 className="font-bold ml-4 mb-2 text-3xl select-none">
                Popular Artist
            </h1>
            <RoundCardsSkeleton />
            <h1 className="font-bold ml-4 mb-2 text-3xl select-none my-2">
                Popular Albums
            </h1>
            <SquareCardsSkeleton />
        </div>
    );
}
