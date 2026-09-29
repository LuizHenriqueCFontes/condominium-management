
import {
    jest,
    describe,
    it,
    expect,
    beforeEach,
} from "@jest/globals";

import api from "../api";
import authService from "../authService";

import type {
    LoginRequest,
    LoginResponse,
} from "../../types/auth";

jest.mock("../api", () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
    },
}));

describe("Auth Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve autenticar o usuário e retornar o token", async () => {

        const credentials: LoginRequest = {
            email: "usuario@email.com",
            password: "senha123",
        };

        const authResponse: LoginResponse = {
            token: "mock-jwt-token",
        };

        jest.mocked(api.post).mockResolvedValue({
            data: authResponse,
        } as never);

        const result = await authService.authenticate(credentials);

        expect(api.post).toHaveBeenCalledWith(
            "/api/auth/login",
            credentials
        );

        expect(result).toEqual(authResponse);
        expect(result.token).toBe("mock-jwt-token");
    });
});