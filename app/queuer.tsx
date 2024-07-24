"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TimePicker from "./timepicker";
import { Generation } from "./generation";
import { AccountInput, IssuerInput, TokenInput } from "./inputs";

interface TotpQueuerProps {
    setGenerations: (
        generations:
            | Generation[]
            | ((generations: Generation[]) => Generation[])
    ) => void;
}

export default function TotpQueuer({ setGenerations }: TotpQueuerProps) {
    const [time, setTime] = useState(0);
    const [token, setToken] = useState("000000");
    const [issuer, setIssuer] = useState("");
    const [account, setAccount] = useState("");

    const generateGenerations = (jobIds: number[]) => {
        return jobIds.map((jobId) => ({
            time,
            token,
            job_id: jobId,
            issuer: issuer || undefined,
            account_name: account,
            selected: true,
            attempts: 0,
        }));
    };

    const handleGenerate = () => {
        if (!account || !token) return;
        const jobId = Math.floor(Math.random() * 100000000);
        setGenerations((generations) => [
            ...generations,
            ...generateGenerations([jobId]),
        ]);
    };

    const handleGenerate4x = () => {
        const jobIds = Array.from({ length: 4 }, () =>
            Math.floor(Math.random() * 100000000)
        );
        setGenerations((generations) => [
            ...generations,
            ...generateGenerations(jobIds),
        ]);
    };

    const handleClear = () => {
        setGenerations([]);
    };

    return (
        <>
            <TokenInput token={token} setToken={setToken} />
            <TimePicker time={time} setTime={setTime} />
            <div className="flex flex-row gap-4 w-full">
                <IssuerInput issuer={issuer} setIssuer={setIssuer} />
                <AccountInput account={account} setAccount={setAccount} />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span className="text-gray-500 font-bold text-xs w-full">
                    Using {navigator?.hardwareConcurrency} threads
                </span>
                <div className="flex flex-row gap-4 w-full">
                    <Button
                        className="w-full"
                        variant="secondary"
                        disabled={!account || !token}
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>
                    <Button
                        className="max-w-fit"
                        variant="outline"
                        onClick={handleGenerate4x}
                    >
                        Generate 4x
                    </Button>
                    <Button
                        className="max-w-fit"
                        variant="outline"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </>
    );
}
