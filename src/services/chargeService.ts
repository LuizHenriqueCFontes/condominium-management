import api from "./api";

import type {
    Charge,
    ChargeRequest,
} from "../types/charge";

const chargeService = {

    async findAll(): Promise<Charge[]> {
        const response = await api.get<Charge[]>(
            "/api/charges"
        );

        return response.data;
    },

    async findById(id: number): Promise<Charge> {
        const response = await api.get<Charge>(
            `/api/charges/${id}`
        );

        return response.data;
    },

    async create(
        data: ChargeRequest
    ): Promise<Charge> {
        const response = await api.post<Charge>(
            "/api/charges",
            data
        );

        return response.data;
    },

    async update(
        id: number,
        data: ChargeRequest
    ): Promise<Charge> {
        const response = await api.put<Charge>(
            `/api/charges/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/charges/${id}`);
    },
};

export default chargeService;