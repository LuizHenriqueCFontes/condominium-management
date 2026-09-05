export interface Unit {
    id: number;
    number: string;
    floor: number | null;
    type: string;
    status: string;
    blockId: number;
    blockName: string;
}

export interface UnitRequest {
    number: string;
    floor: number | null;
    type: string;
    status: string;
    blockId: number;
}