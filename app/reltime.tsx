import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

const relativetime = (diff: number): string => {
    const abs_diff = Math.abs(diff);

    const minutes = Math.floor(abs_diff / 60) % 60;
    const hours = Math.floor(abs_diff / 3600) % 24;
    const days = Math.floor(abs_diff / 86400);

    if (days > 0) {
        const p = days > 1 ? "s" : "";
        return diff > 0 ? `${days} day${p} ago` : `in ${days} day${p}`;
    } else if (hours > 0) {
        const p = hours > 1 ? "s" : "";
        return diff > 0 ? `${hours} hour${p} ago` : `in ${hours} hour${p}`;
    } else if (minutes > 0) {
        const p = minutes > 1 ? "s" : "";
        return diff > 0
            ? `${minutes} minute${p} ago`
            : `in ${minutes} minute${p}`;
    } else {
        const p = abs_diff > 1 ? "s" : "";
        return diff > 0
            ? `${abs_diff} second${p} ago`
            : `in ${abs_diff} second${p}`;
    }
};

export default function RelativeTime({ time }: { time: number }) {
    const [diff, setDiff] = useState(Math.floor(Date.now() / 1000) - time);

    useEffect(() => {
        setDiff(Math.floor(Date.now() / 1000) - time);
    }, [time]);

    useInterval(
        () => {
            setDiff(Math.floor(Date.now() / 1000) - time);
        },
        Math.abs(diff) > 60 ? 5000 : 1000
    );

    return <span>{relativetime(diff)}</span>;
}
