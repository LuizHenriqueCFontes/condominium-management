export interface Block {
    id: number;
    name: string;
    condominiumId: number;
    condominiumName: string;
}

export interface BlockRequest {
    name: string;
    condominiumId: number;
}