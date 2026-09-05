export type ExpenseCategory =
    | "WATER"
    | "ELECTRICITY"
    | "MAINTENANCE"
    | "CLEANING"
    | "SECURITY"
    | "SALARY"
    | "TAX"
    | "OTHER";

export interface Expense {
    id: number;
    description: string;
    amount: number;
    expenseDate: string;
    category: ExpenseCategory;
    condominiumId: number;
    condominiumName: string;
}

export interface ExpenseRequest {
    description: string;
    amount: number;
    expenseDate: string;
    category: ExpenseCategory | "";
    condominiumId: number;
}