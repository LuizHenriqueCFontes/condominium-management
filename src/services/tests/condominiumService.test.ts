import { jest, describe, it, expect, beforeEach } from "@jest/globals";

import api from "../api";
import condominiumService from "../condominiumService";
import type { Condominium } from "../../types/condominium";

jest.mock("../api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

describe("Condominium Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todos os condomínios", async () => {

        const condominiums: Condominium[] = [
            {
                id: 1,
                name: "Condomínio Residencial",
                cnpj: "12345678000199",
                email: "contato@condominio.com",
                phone: "61999999999",
                address: "Brasília - DF",
                status: "ACTIVE",
            },
        ];

        jest.mocked(api.get).mockResolvedValue({
            data: condominiums,
        } as never);

        const result = await condominiumService.findAll();

        expect(api.get).toHaveBeenCalledWith(
            "/api/condominiums"
        );

        expect(result).toEqual(condominiums);
    });
});