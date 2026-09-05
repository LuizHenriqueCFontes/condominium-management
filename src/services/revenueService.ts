import api from "./api";

import type {
    Revenue,
    RevenueRequest,
} from "../types/revenue";

const revenueService = {

    async findAll(): Promise<Revenue[]> {
        const response = await api.get<Revenue[]>(
            "api/revenues"
        );

        return response.data;
    },

    async findById(
        id: number
    ): Promise<Revenue> {
        const response = await api.get<Revenue>(
            `api/revenues/${id}`
        );

        return response.data;
    },

    async create(
        data: RevenueRequest
    ): Promise<Revenue> {
        const response = await api.post<Revenue>(
            "api/revenues",
            data
        );

        return response.data;
    },

    async update(
        id: number,
        data: RevenueRequest
    ): Promise<Revenue> {
        const response = await api.put<Revenue>(
            `api/revenues/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`api/revenues/${id}`);
    },
};

export default revenueService;