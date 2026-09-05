import api from "./api";
import type { User } from "../types/user";

const userService = {
    async findAll(): Promise<User[]> {
        const response = await api.get<User[]>("/api/users");

        return response.data;
    },
};

export default userService;