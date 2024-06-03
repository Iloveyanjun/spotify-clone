import {
    DiscographiesSkeleton,
    TopTracksSkeleton,
} from "@/components/Skeletons";

export default function Loading() {
    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[200px]">
            <div className="flex flex-col justify-end">
                <div className="flex text-8xl font-bold pt-52 pb-14 px-5  bg-gradient-to-b from-neutral-500 to-primary ">
                    {/* image skeleton */}
                    <div className="rounded-full mr-5 object-cover w-[150px] h-[150px] bg-neutral-500/20 animate-pulse"></div>
                    <div className="self-end w-[25%] h-[96px] bg-neutral-500/20 rounded-md object-cover animate-pulse"></div>
                </div>
                <div className="px-6">
                    <div className="font-bold text-2xl mb-4">熱門</div>
                    <TopTracksSkeleton />
                </div>
            </div>
            <div className="flex flex-col px-6">
                <div className="text-2xl font-bold my-4">專輯</div>
                <div className="flex flex-wrap">
                    <DiscographiesSkeleton />
                </div>
            </div>
        </div>
    );
}
