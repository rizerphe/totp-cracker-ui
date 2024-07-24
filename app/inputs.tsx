import { Input } from "@/components/ui/input";

export function TokenInput({
    token,
    setToken,
}: {
    token: string;
    setToken: (value: string) => void;
}) {
    return (
        <Input
            type="text"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
        />
    );
}

export function IssuerInput({
    issuer,
    setIssuer,
}: {
    issuer: string;
    setIssuer: (value: string) => void;
}) {
    return (
        <Input
            type="text"
            placeholder="Issuer"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
        />
    );
}

export function AccountInput({
    account,
    setAccount,
}: {
    account: string;
    setAccount: (value: string) => void;
}) {
    return (
        <Input
            type="text"
            placeholder="Account name"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
        />
    );
}
