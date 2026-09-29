import {
    jest,
    describe,
    it,
    expect,
    beforeEach,
} from "@jest/globals";

import api from "../api";
import blockService from "../blockService";

import type { Block } from "../../types/block";

jest.mock("../api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

describe("Block Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar todos os blocos", async () => {

        const blocks: Block[] = [
            {
                id: 1,
                name: "Bloco A",
                condominiumId: 1,
                condominiumName: "Condomínio Residencial",
            },
        ];

        jest.mocked(api.get).mockResolvedValue({
            data: blocks,
        } as never);

        const result = await blockService.findAll();

        expect(api.get).toHaveBeenCalledWith(
            "/api/blocks"
        );

        expect(result).toEqual(blocks);
    });
});