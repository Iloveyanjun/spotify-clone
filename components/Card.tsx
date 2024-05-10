import Image from "next/image";
import logo from "@/app/favicon.ico";

export default function Card() {
    return (
        <div>
            <h1>Popular artist</h1>
            <div className="flex bg-white w-scrren overflow-hidden ">
                <Image src={logo} alt="logo" width={100} height={100} />
                <Image src={logo} alt="logo" width={100} height={100} />
                <Image src={logo} alt="logo" width={100} height={100} />
            </div>
        </div>
    );
}
