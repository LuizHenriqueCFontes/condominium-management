export type ChargeStatus =
    | "PENDING"
    | "PAID"
    | "OVERDUE"
    | "CANCELLED";

export interface Charge {
    id: number;
    description: string;
    amount: number;
    dueDate: string;
    referenceMonth: string;
    status: ChargeStatus;
    unitId: number;
    unitNumber: string;
}

export interface ChargeRequest {
    description: string;
    amount: number;
    dueDate: string;
    referenceMonth: string;
    unitId: number;
}