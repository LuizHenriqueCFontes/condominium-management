
import {
    jest,
    describe,
    it,
    expect,
    beforeEach,
} from "@jest/globals";

import api from "../api";
import unitService from "../unitService";

import type { Unit } from "../../types/unit";

jest.mock("../api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

describe("Unit Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todas as unidades", async () => {

        const units: Unit[] = [
            {
                id: 1,
                number: "101",
                floor: 1,
                type: "APARTMENT",
                status: "AVAILABLE",
                blockId: 1,
                blockName: "Bloco A",
            },
        ];

        jest.mocked(api.get).mockResolvedValue({
            data: units,
        } as never);

        const result = await unitService.findAll();

        expect(api.get).toHaveBeenCalledWith(
            "/api/units"
        );

        expect(result).toEqual(units);
    });
});