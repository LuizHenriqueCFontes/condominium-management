import api from "./api";
import type {
    Block,
    BlockRequest,
} from "../types/block";

const blockService = {

    async findAll(): Promise<Block[]> {
        const response = await api.get<Block[]>(
            "/api/blocks"
        );

        return response.data;
    },

    async findById(id: number): Promise<Block> {
        const response = await api.get<Block>(
            `/api/blocks/${id}`
        );

        return response.data;
    },

    async create(
        data: BlockRequest
    ): Promise<Block> {
        const response = await api.post<Block>(
            "/api/blocks",
            data
        );

        return response.data;
    },

    async update(
        id: number,
        data: BlockRequest
    ): Promise<Block> {
        const response = await api.put<Block>(
            `/api/blocks/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/blocks/${id}`);
    },
};

export default blockService;