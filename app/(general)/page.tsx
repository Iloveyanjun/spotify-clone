import Card from "@/components/Card";
import { getWeeklyData } from "../actions";

export default async function HomePage() {
    return (
        <div className="px-2 py-2 bg-primary flex-grow overflow-hidden hover:overflow-y-auto">
            <form action={getWeeklyData}>
                <button className="bg-blue-500 rounded-md hover:bg-red-400">
                    scrap weekly popular data
                </button>
            </form>
            <Card />
        </div>
    );
}
