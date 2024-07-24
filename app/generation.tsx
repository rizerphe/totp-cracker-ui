export interface Generation {
    secret?: Uint8Array;
    time: number;
    token: string;
    job_id: number;
    expected_time?: number;
    issuer?: string;
    account_name: string;
    selected: boolean;
    attempts: number;
}
