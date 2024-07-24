"use client";
import { Accordion } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import TotpCode from "./code";
import { Generation } from "./generation";
import MigrationCode from "./migration";
import TotpQueuer from "./queuer";

import init, * as wasm from "totp-cracker-wasm";

const work_on = (job: Generation) => {
    const start_time = Date.now();
    const iterations = 5000;
    const secret = wasm.try_find(
        BigInt(job.time),
        job.token,
        navigator?.hardwareConcurrency,
        job.attempts,
        iterations,
        job.job_id
    );

    const time_taken = Date.now() - start_time;
    const expected_time =
        ((time_taken / iterations / navigator?.hardwareConcurrency) *
            Math.pow(10, job.token.length)) /
        2 /
        1000;

    return {
        ...job,
        secret,
        expected_time,
        attempts: job.attempts + 1,
    };
};

const pick_job = (generations: Generation[]): Generation | undefined => {
    return generations.find((gen) => !gen.secret);
};

export default function TotpCracker() {
    const [generations, setGenerations] = useState<Generation[]>([]);

    useEffect(() => {
        init().then(() => {
            wasm.initThreadPool(navigator?.hardwareConcurrency);
        });
    }, []);

    useEffect(() => {
        const job = pick_job(generations);

        if (!job) {
            return;
        }

        const work = async () => {
            const generation = work_on(job);
            await new Promise((resolve) => setTimeout(resolve, 0));

            if (generation) {
                setGenerations((generations) =>
                    generations.map((s) =>
                        s.job_id === generation.job_id ? generation : s
                    )
                );
            }
        };

        work();
    }, [generations]);

    return (
        <>
            <div className="flex flex-row gap-4 w-full items-stretch justify-center flex-wrap-reverse">
                <div className="flex flex-col gap-4 flex-1">
                    <TotpQueuer setGenerations={setGenerations} />
                </div>
                <MigrationCode
                    generations={generations.filter((gen) => gen.selected)}
                />
            </div>
            <Accordion type="single" collapsible className="w-full">
                {[...generations].reverse().map((secret) => (
                    <TotpCode
                        key={secret.job_id}
                        generation={secret}
                        setGeneration={(generation) =>
                            setGenerations(
                                generations.map((s) =>
                                    s.job_id === generation.job_id
                                        ? generation
                                        : s
                                )
                            )
                        }
                    />
                ))}
            </Accordion>
        </>
    );
}
