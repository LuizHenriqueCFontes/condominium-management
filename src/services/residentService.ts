import api from "./api";
import type {
    Resident,
    ResidentRequest,
} from "../types/resident";

const residentService = {

    async findAll(): Promise<Resident[]> {
        const response = await api.get<Resident[]>(
            "/api/residents"
        );

        return response.data;
    },

    async findById(id: number): Promise<Resident> {
        const response = await api.get<Resident>(
            `/api/residents/${id}`
        );

        return response.data;
    },

    async create(
        data: ResidentRequest
    ): Promise<Resident> {
        const response = await api.post<Resident>(
            "/api/residents",
            data
        );

        return response.data;
    },

    async update(
        id: number,
        data: ResidentRequest
    ): Promise<Resident> {
        const response = await api.put<Resident>(
            `/api/residents/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/residents/${id}`);
    },
};

export default residentService;