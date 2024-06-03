export function RoundCardSkeleton() {
    return (
        <div className="flex flex-col items-center bg-skeleton-base  rounded-lg shadow-2xl p-5 mx-3">
            <div className="w-[180px] h-[180px] bg-skeleton-content rounded-full mb-4 animate-pulse" />
            <div className="w-[170px] h-6 bg-skeleton-content mb-3 rounded-xl animate-pulse self-start" />
            <div className="w-[130px] h-6 bg-skeleton-content mb-3 self-start rounded-xl animate-pulse" />
        </div>
    );
}
// 重複使用的圓形卡片骨架屏
export function RoundCardsSkeleton() {
    return (
        <div className="flex">
            <RoundCardSkeleton />
            <RoundCardSkeleton />
            <RoundCardSkeleton />
            <RoundCardSkeleton />
            <RoundCardSkeleton />
            <RoundCardSkeleton />
            <RoundCardSkeleton />
        </div>
    );
}

export function SquareCardSkeleton() {
    return (
        <div className="flex flex-col items-center bg-skeleton-base rounded-lg shadow-2xl p-5 mx-3">
            <div className="w-[180px] h-[180px] bg-skeleton-content rounded-lg mb-4 animate-pulse" />
            <div className="w-[170px] h-6 bg-skeleton-content mb-3 rounded-xl animate-pulse self-start" />
            <div className="w-[130px] h-6 bg-skeleton-content mb-3 self-start rounded-xl animate-pulse" />
        </div>
    );
}
// 重複使用的方形骨架屏
export function SquareCardsSkeleton() {
    return (
        <div className="flex">
            <SquareCardSkeleton />
            <SquareCardSkeleton />
            <SquareCardSkeleton />
            <SquareCardSkeleton />
            <SquareCardSkeleton />
            <SquareCardSkeleton />
            <SquareCardSkeleton />
        </div>
    );
}
// 藝人熱門單曲的骨架
export function TopTrackSkeleton({ index }: { index: number }) {
    return (
        <div className="flex p-4 w-[55%] rounded-md">
            <div className="self-center mr-4 text-inactive">{index}</div>
            <div className="mr-3 w-10 h-10 bg-skeleton-artist animate-pulse" />
            <div className="w-[300px] h-5 bg-skeleton-artist rounded-md animate-pulse" />
            <div className="self-center ml-auto bg-skeleton-artist w-9 rounded-md animate-pulse h-4" />
        </div>
    );
}
// 連續5個藝人熱門單曲的骨架
export function TopTracksSkeleton() {
    return (
        <>
            <TopTrackSkeleton index={1} />
            <TopTrackSkeleton index={2} />
            <TopTrackSkeleton index={3} />
            <TopTrackSkeleton index={4} />
            <TopTrackSkeleton index={5} />
        </>
    );
}

export function DiscographySkeleton() {
    return (
        <div className="flex flex-col hover:bg-neutral-500/10 rounded-md p-3 w-[170px]">
            <div>
                <div className="rounded-md w-[150px] h-[150px] bg-skeleton-artist animate-pulse" />
                <div className="flex bg-skeleton-artist w-[120px] my-2 h-5 animate-pulse rounded-md" />
                <div className="flex bg-skeleton-artist w-[90px] h-5 animate-pulse rounded-md" />
            </div>
        </div>
    );
}

export function DiscographiesSkeleton() {
    return (
        <>
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
            <DiscographySkeleton />
        </>
    );
}

export function AlbumTrackSkeleton() {
    return (
        <div className="flex mx-3 justify-between py-2 select-none">
            <div className="flex">
                <div className="self-center mx-7 bg-skeleton-artist">
                    <div className="self-center  flex items-center bg-skeleton-artist">
                        <div className="rounded-md w-3 h-5 bg-skeleton-artist animate-pulse"></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="h-5 w-48 rounded-md animate-pulse bg-skeleton-artist mb-2" />
                    <div className="h-5 w-36 rounded-md animate-pulse bg-skeleton-artist" />
                </div>
            </div>
            {/* 歌曲持續時間 */}
            <div className="h-5 w-9 rounded-md animate-pulse bg-skeleton-artist flex self-center mr-10"></div>
        </div>
    );
}

export function AlbumTracksSkeleton() {
    return (
        <div>
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
            <AlbumTrackSkeleton />
        </div>
    );
}
