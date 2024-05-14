import PopularArtists from "@/components/PopularArtists";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
    return (
        <div className="px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <PopularArtists />
        </div>
    );
}
