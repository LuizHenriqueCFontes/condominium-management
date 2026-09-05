export type RevenueCategory =
    | "CONDOMINIUM_FEE"
    | "FINE"
    | "COMMON_AREA_RENT"
    | "OTHER";

export interface Revenue {
    id: number;
    description: string;
    amount: number;
    revenueDate: string;
    category: RevenueCategory;
    condominiumId: number;
    condominiumName: string;
}

export interface RevenueRequest {
    description: string;
    amount: number;
    revenueDate: string;
    category: RevenueCategory;
    condominiumId: number;
}