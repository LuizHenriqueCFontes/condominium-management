import { useEffect, useState } from "react";
import {
    Building2,
    CircleDollarSign,
    Receipt,
    Users,
} from "lucide-react";

import condominiumService from "../../services/condominiumService";
import residentService from "../../services/residentService";
import revenueService from "../../services/revenueService";
import expenseService from "../../services/expenseService";

import type { Condominium } from "../../types/condominium";
import type { Resident } from "../../types/resident";
import type { Revenue } from "../../types/revenue";
import type { Expense } from "../../types/expense";

export default function Dashboard() {
    const [condominiums, setCondominiums] = useState<Condominium[]>([]);
    const [residents, setResidents] = useState<Resident[]>([]);
    const [revenues, setRevenues] = useState<Revenue[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setLoading(true);

            const [
                condominiumsData,
                residentsData,
                revenuesData,
                expensesData,
            ] = await Promise.all([
                condominiumService.findAll(),
                residentService.findAll(),
                revenueService.findAll(),
                expenseService.findAll(),
            ]);

            setCondominiums(condominiumsData);
            setResidents(residentsData);
            setRevenues(revenuesData);
            setExpenses(expensesData);
        } catch (error) {
            console.error("Erro ao carregar dashboard:", error);
        } finally {
            setLoading(false);
        }
    }

    const totalRevenue = revenues.reduce(
        (total, revenue) => total + Number(revenue.amount),
        0
    );

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const cards = [
        {
            title: "Condomínios",
            value: loading ? "..." : condominiums.length.toString(),
            icon: Building2,
        },
        {
            title: "Moradores",
            value: loading ? "..." : residents.length.toString(),
            icon: Users,
        },
        {
            title: "Receitas",
            value: loading ? "..." : formatCurrency(totalRevenue),
            icon: CircleDollarSign,
        },
        {
            title: "Despesas",
            value: loading ? "..." : formatCurrency(totalExpenses),
            icon: Receipt,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Visão geral do seu condomínio
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {card.title}
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-slate-900">
                                        {card.value}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                                    <Icon size={22} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                    Bem-vindo ao Condominium
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Utilize o menu lateral para acessar as funcionalidades
                    do sistema.
                </p>
            </div>
        </div>
    );
}

