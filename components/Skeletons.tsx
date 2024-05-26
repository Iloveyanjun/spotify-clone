export function RoundCardSkeleton() {
    return (
        <div className="flex flex-col items-center bg-skeleton-base  rounded-lg shadow-2xl p-5 mx-3">
            <div className="w-[180px] h-[180px] bg-skeleton-content rounded-full mb-4 animate-pulse" />
            <div className="w-[170px] h-6 bg-skeleton-content mb-3 rounded-xl animate-pulse self-start" />
            <div className="w-[130px] h-6 bg-skeleton-content mb-3 self-start rounded-xl animate-pulse" />
        </div>
    );
}

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
