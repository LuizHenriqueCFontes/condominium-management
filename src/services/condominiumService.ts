import api from "./api";
import type {
    Condominium,
    CondominiumRequest,
} from "../types/condominium";

const condominiumService = {

    async findAll(): Promise<Condominium[]> {
        const response = await api.get<Condominium[]>(
            "/api/condominiums"
        );

        return response.data;
    },

    async findById(id: number): Promise<Condominium> {
        const response = await api.get<Condominium>(
            `/api/condominiums/${id}`
        );

        return response.data;
    },

    async create(
        data: CondominiumRequest
    ): Promise<Condominium> {
        const response = await api.post<Condominium>(
            "/api/condominiums",
            data
        );

        return response.data;
    },

    async update(
        id: number,
        data: CondominiumRequest
    ): Promise<Condominium> {
        const response = await api.put<Condominium>(
            `/api/condominiums/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/condominiums/${id}`);
    },
};

export default condominiumService;