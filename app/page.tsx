import TotpCracker from "./cracker";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Link href="/about" className="text-lg text-slate-400">
                What is this?
            </Link>
            <TotpCracker />
        </>
    );
}
