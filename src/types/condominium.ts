export interface Condominium {
    id: number;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: string;
    status: string;
}

export interface CondominiumRequest {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: string;
    status: string;
}