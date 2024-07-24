import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function QRCode({
    qr_code,
    children,
}: {
    qr_code?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2 items-center">
            {qr_code && (
                <div className="w-64 h-64 rounded overflow-hidden border-slate-800 border">
                    <Dialog>
                        <DialogTrigger>
                            {qr_code ? (
                                <img
                                    src={`data:image/png;base64,${qr_code}`}
                                    alt="QR code"
                                    className="w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800" />
                            )}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>TOTP QR code</DialogTitle>
                                <DialogDescription>
                                    <img
                                        src={`data:image/png;base64,${qr_code}`}
                                        alt="QR code"
                                        className="w-full h-full"
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {children}
        </div>
    );
}
