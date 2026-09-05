import api from "./api";
import type {
    Expense,
    ExpenseRequest,
} from "../types/expense";

const expenseService = {
    async findAll(): Promise<Expense[]> {
        const response = await api.get<Expense[]>(
            "api/expenses"
        );

        return response.data;
    },

    async findById(id: number): Promise<Expense> {
        const response = await api.get<Expense>(
            `api/expenses/${id}`
        );

        return response.data;
    },

    async create(
        data: ExpenseRequest
    ): Promise<Expense> {
        const response = await api.post<Expense>(
            "/expenses",
            data
        );

        return response.data;
    },

    async update(
        id: number,
        data: ExpenseRequest
    ): Promise<Expense> {
        const response = await api.put<Expense>(
            `api/expenses/${id}`,
            data
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/expenses/${id}`);
    },
};

export default expenseService;