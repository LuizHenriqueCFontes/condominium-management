
import {
    jest,
    describe,
    it,
    expect,
    beforeEach,
} from "@jest/globals";

import api from "../api";
import residentService from "../residentService";

import type { Resident } from "../../types/resident";

jest.mock("../api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

describe("Resident Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todos os moradores", async () => {

        const residents: Resident[] = [
            {
                id: 1,
                userId: 1,
                name: "João Silva",
                email: "joao@email.com",
                cpf: "12345678900",
                phone: "61999999999",
                birthDate: "1995-05-20",
                unitId: 1,
                unitNumber: "101",
            },
        ];

        jest.mocked(api.get).mockResolvedValue({
            data: residents,
        } as never);

        const result = await residentService.findAll();

        expect(api.get).toHaveBeenCalledWith(
            "/api/residents"
        );

        expect(result).toEqual(residents);
    });
});