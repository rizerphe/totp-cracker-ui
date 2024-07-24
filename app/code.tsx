import { Generation } from "./generation";
import RelativeTime from "./reltime";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FaCheckCircle, FaSpinner, FaMinusCircle } from "react-icons/fa";

import init, * as wasm from "totp-cracker-wasm";
import { AccountInput, IssuerInput } from "./inputs";
import QRCode from "./qrcode";
init();

function CheckboxWithLabel({
    checked,
    onCheckedChange,
    onClick,
    children,
}: {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row items-center justify-start gap-4">
            <Checkbox
                checked={checked}
                onCheckedChange={onCheckedChange}
                onClick={onClick}
            />
            {children}
        </div>
    );
}

function AccountInfo({
    issuer,
    account_name,
}: {
    issuer?: string;
    account_name: string;
}) {
    return (
        <>
            {account_name ? (
                issuer ? (
                    `${issuer}: ${account_name}`
                ) : (
                    account_name
                )
            ) : (
                <span className="text-orange-500">No account name</span>
            )}
        </>
    );
}

function TokenAndTime({ token, time }: { token: string; time: number }) {
    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <span className="font-mono font-bold text-slate-200 bg-slate-800 p-1 rounded max-w-fit">
                {token}
            </span>
            <RelativeTime time={time} />
        </div>
    );
}

function ExpectedTime({ expected_time }: { expected_time?: number }) {
    return expected_time ? (
        <span className="text-orange-500 font-bold text-xs w-full">
            Generating QR code; estimated time:{" "}
            {expected_time > 60 &&
                `${Math.floor(expected_time / 60)} minute(s) `}
            {Math.floor(expected_time % 60)} second(s)
        </span>
    ) : (
        <span className="text-orange-500 font-bold text-xs w-full">
            Generation queued
        </span>
    );
}

function AccountNameWarning() {
    return (
        <span className="text-orange-500 font-bold text-xs w-full">
            No account name, code probably will not work
        </span>
    );
}

export default function TotpCode({
    generation,
    setGeneration,
}: {
    generation: Generation;
    setGeneration: (generation: Generation) => void;
}) {
    const { secret, time, token, expected_time, issuer, account_name } =
        generation;

    const qr_code =
        secret &&
        wasm.get_qr_code(
            secret,
            issuer || undefined,
            account_name,
            token.length
        );

    return (
        <AccordionItem value={String(generation.job_id)}>
            <AccordionTrigger>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <CheckboxWithLabel
                        checked={generation.selected}
                        onCheckedChange={(checked) =>
                            setGeneration({
                                ...generation,
                                selected: Boolean(checked),
                            })
                        }
                        onClick={(e) => e.stopPropagation()}
                    >
                        {secret ? (
                            <FaCheckCircle className="text-green-500" />
                        ) : expected_time ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <FaMinusCircle />
                        )}
                        <AccountInfo
                            issuer={issuer}
                            account_name={account_name}
                        />
                    </CheckboxWithLabel>
                    <TokenAndTime token={token} time={time} />
                </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col items-center">
                <QRCode qr_code={qr_code}>
                    {!qr_code && <ExpectedTime expected_time={expected_time} />}
                    {!account_name && <AccountNameWarning />}
                    <IssuerInput
                        issuer={issuer || ""}
                        setIssuer={(issuer) =>
                            setGeneration({ ...generation, issuer })
                        }
                    />
                    <AccountInput
                        account={account_name}
                        setAccount={(account_name) =>
                            setGeneration({ ...generation, account_name })
                        }
                    />
                </QRCode>
            </AccordionContent>
        </AccordionItem>
    );
}
