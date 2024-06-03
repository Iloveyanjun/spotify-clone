import { AlbumTracksSkeleton } from "@/components/Skeletons";

export default function Loading() {
    return (
        <div className="py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-[100px]">
            <div className="flex bg-gradient-to-b from-neutral-400 to-primary h-auto pt-14 pb-10">
                <div className="mx-5 rounded-md w-[200px] h-[200px] self-end bg-skeleton-artist" />
                <div className="flex flex-col justify-end">
                    <div className="mt-10 font-bold">專輯</div>
                    <div className="w-[300px] h-[48px] bg-skeleton-artist animate-pulse rounded-md mb-5" />

                    <div className="flex text-sm mb-1 font-bold">
                        <div className="w-10 h-4 bg-skeleton-artist animate-pulse rounded-md" />
                        <div className="mx-1" />
                        <div className="w-10 h-4 bg-skeleton-artist animate-pulse rounded-md" />
                        <div className="mx-1" />
                        <div className="w-10 h-4 bg-skeleton-artist animate-pulse rounded-md" />
                    </div>
                </div>
            </div>
            <AlbumTracksSkeleton />
        </div>
    );
}
