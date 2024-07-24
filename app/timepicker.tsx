import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import RelativeTime from "./reltime";

export default function TimePicker({
    time,
    setTime,
}: {
    time: number;
    setTime: (time: number) => void;
}) {
    const [datetime, setDatetime] = useState(
        new Date(Date.now() - (Date.now() % 30_000))
    );

    const update = () => {
        // If in the past, add a day
        if (datetime.getTime() < Date.now()) {
            const newDate = new Date(datetime);
            newDate.setDate(datetime.getDate() + 1);
            setDatetime(newDate);
            return;
        }

        // Go back a day if we can
        if (datetime.getTime() > Date.now() + 24 * 60 * 60 * 1000) {
            const newDate = new Date(datetime);
            newDate.setDate(datetime.getDate() - 1);
            setDatetime(newDate);
            return;
        }

        const time = Math.floor(datetime.getTime() / 1000);
        setTime(time);
    };

    useEffect(update, [datetime]);
    useInterval(update, 1000);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [h, m] = e.target.value.split(":").map(Number);
        const newDate = new Date(datetime);
        newDate.setHours(h);
        newDate.setMinutes(m);
        setDatetime(newDate);
    };

    const handleSecondsChange = (v: string) => {
        const newDate = new Date(datetime);
        newDate.setSeconds(+v);
        setDatetime(newDate);
    };

    const handleButtonClicked = (minutes: number) => {
        const date = new Date();
        date.setMinutes(date.getMinutes() + minutes);
        date.setSeconds(date.getSeconds() - (date.getSeconds() % 30));
        setDatetime(date);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between w-full items-stretch gap-8">
                <div className="flex flex-row items-stretch gap-4">
                    <Input
                        type="time"
                        value={`${String(datetime.getHours()).padStart(
                            2,
                            "0"
                        )}:${String(datetime.getMinutes()).padStart(2, "0")}`}
                        onChange={handleTimeChange}
                    />
                    <Select
                        value={String(datetime.getSeconds())}
                        onValueChange={handleSecondsChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="00" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"0"}>0 seconds</SelectItem>
                            <SelectItem value={"30"}>30 seconds</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row items-stretch gap-4">
                    <Button
                        variant="outline"
                        onClick={() => handleButtonClicked(1)}
                    >
                        1m
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleButtonClicked(5)}
                    >
                        5m
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleButtonClicked(15)}
                    >
                        15m
                    </Button>
                </div>
            </div>
            <span className="text-gray-500 font-bold text-xs w-full">
                Currently selected: <RelativeTime time={time} />
            </span>
        </div>
    );
}
