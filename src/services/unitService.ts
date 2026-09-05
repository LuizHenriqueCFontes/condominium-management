import api from "./api";
import type {
    Unit,
    UnitRequest,
} from "../types/unit";

const unitService = {

    async findAll(): Promise<Unit[]> {
        const response = await api.get<Unit[]>(
            "/api/units"
        );

        return response.data;
    },

    async findById(id: number): Promise<Unit> {
        const response = await api.get<Unit>(
            `/api/units/${id}`
        );

        return response.data;
    },

    async create(
        data: UnitRequest
    ): Promise<Unit> {
        const response = await api.post<Unit>(
            "/api/units",
            data
        );

        return response.data;
    },

    async update(
        id: number,
        data: UnitRequest
    ): Promise<Unit> {
        const response = await api.put<Unit>(
            `/api/units/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/units/${id}`);
    },
};

export default unitService;