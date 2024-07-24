import init, * as wasm from "totp-cracker-wasm";
import { Generation } from "./generation";
import QRCode from "./qrcode";
init();

function Placeholder() {
    return (
        <div className="grid place-content-center gap-4 flex-shrink-0 rounded overflow-hidden border-slate-800 border p-4">
            <div className="w-64 h-64 grid place-content-center bg-slate-900"></div>
            <span className="text-orange-500 font-bold text-xs w-full">
                No TOTP codes added
            </span>
        </div>
    );
}

export default function MigrationCode({
    generations,
}: {
    generations: Generation[];
}) {
    if (generations.length <= 0) {
        return <Placeholder />;
    }

    const inputs = generations
        .filter((gen) => gen.secret)
        .map(
            (gen) =>
                new wasm.OtpCode(
                    gen.secret as Uint8Array,
                    gen.issuer,
                    gen.account_name,
                    gen.token.length
                )
        );

    const still_generating = generations.filter((gen) => !gen.secret).length;

    const qr_code = wasm.create_migration_qr(inputs);

    return (
        <div className="grid place-content-center gap-4 flex-shrink-0 rounded overflow-hidden border-slate-800 border p-4">
            <QRCode qr_code={qr_code}>
                <div className="flex flex-row gap-2 justify-between items-center w-full">
                    <span className="text-gray-500 font-bold text-xs">
                        {inputs.length} TOTP code(s)
                    </span>
                    {still_generating !== 0 && (
                        <span className="text-orange-500 font-bold text-xs">
                            {still_generating} still generating
                        </span>
                    )}
                </div>
            </QRCode>
        </div>
    );
}
