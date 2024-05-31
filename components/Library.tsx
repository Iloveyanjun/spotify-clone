import { useEffect } from "react";
import LibraryContent from "./LibraryContent";
import { getLikedTracks, getUser } from "@/app/actions";

export default function Library() {
    useEffect(() => {
        async function getLiked() {
            const user = await getUser();
            if (user) {
                await getLikedTracks(user.id);
            }
        }
        getLiked();
    }, []);


    return (
        <div>
            {/* content */}
            <LibraryContent name="Homer" id="123" artist="Homer" type="artist"/>
        </div>
    );
}
