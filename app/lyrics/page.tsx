import { getLyrics } from "@/apis/lyrics";
import LyricsList from "@/components/LyricsList";

export default async function LyricsPage() {


    return (
        <div className="px-2 py-2 flex flex-col items-center bg-primary flex-grow overflow-hidden hover:overflow-y-auto pb-40">
            <LyricsList />
        </div>
    );
}
