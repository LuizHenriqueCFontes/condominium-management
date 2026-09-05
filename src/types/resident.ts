export interface Resident {
    id: number;
    userId: number;
    name: string;
    email: string;
    cpf: string;
    phone: string | null;
    birthDate: string | null;
    unitId: number;
    unitNumber: string;
}

export interface ResidentRequest {
    cpf: string;
    phone: string;
    birthDate: string;
    userId: number;
    unitId: number;
}