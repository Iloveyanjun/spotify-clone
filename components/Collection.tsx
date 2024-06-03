import Image from "next/image";
import likedList from "@/public/liked-songs-300.png";
import Link from "next/link";

export default function Collection() {

    return (
        <Link href="/collection/tracks">
            <div className="flex p-2 rounded-md hover:bg-neutral-500/20">
                <Image
                    className="rounded-md w-12 h-12"
                    src={likedList}
                    width={48}
                    height={48}
                    alt="image"
                />
                <div className="pl-2">
                    <div className="text-nowrap text-ellipsis overflow-hidden">
                        已按讚的歌曲
                    </div>
                    <div className="text-sm text-inactive">播放清單</div>
                </div>
            </div>
        </Link>
    );
}
