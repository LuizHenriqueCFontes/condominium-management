import api from "./api.ts";

import type {
    LoginRequest,
    LoginResponse,
} from "../types/auth.ts";

const authService = {
    async authenticate(data: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>(
            "/api/auth/login",
            data
        );

        return response.data;
    },
};

export default authService;