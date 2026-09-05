import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react";

import expenseService from "../../services/expenseService";
import condominiumService from "../../services/condominiumService";

import type {
    Expense,
    ExpenseRequest,
    ExpenseCategory,
} from "../../types/expense";

import type { Condominium } from "../../types/condominium";

const initialForm: ExpenseRequest = {
    description: "",
    amount: 0,
    expenseDate: "",
    category: "",
    condominiumId: 0,
};

const categoryLabels: Record<
    ExpenseCategory,
    string
> = {
    WATER: "Água",
    ELECTRICITY: "Energia elétrica",
    MAINTENANCE: "Manutenção",
    CLEANING: "Limpeza",
    SECURITY: "Segurança",
    SALARY: "Salário",
    TAX: "Imposto",
    OTHER: "Outros",
};

export default function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>(
        []
    );

    const [condominiums, setCondominiums] = useState<
        Condominium[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [editingId, setEditingId] = useState<
        number | null
    >(null);

    const [deletingId, setDeletingId] = useState<
        number | null
    >(null);

    const [form, setForm] =
        useState<ExpenseRequest>(initialForm);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);

            const [
                expensesData,
                condominiumsData,
            ] = await Promise.all([
                expenseService.findAll(),
                condominiumService.findAll(),
            ]);

            setExpenses(expensesData);
            setCondominiums(condominiumsData);
        } catch (error) {
            console.error(
                "Erro ao carregar despesas:",
                error
            );
        } finally {
            setLoading(false);
        }
    }

    function handleChange(
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) {
        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,

            [name]:
                name === "condominiumId"
                    ? Number(value)
                    : name === "amount"
                        ? Number(value)
                        : value,
        }));
    }

    function openCreateModal() {
        setEditingId(null);

        setForm({
            ...initialForm,
        });

        setModalOpen(true);
    }

    function openEditModal(expense: Expense) {
        setEditingId(expense.id);

        setForm({
            description: expense.description,
            amount: expense.amount,
            expenseDate: expense.expenseDate,
            category: expense.category,
            condominiumId: expense.condominiumId,
        });

        setModalOpen(true);
    }

    function closeModal() {
        if (saving) {
            return;
        }

        setModalOpen(false);

        setEditingId(null);

        setForm({
            ...initialForm,
        });
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (
            form.amount <= 0 ||
            form.condominiumId === 0 ||
            form.category === ""
        ) {
            return;
        }

        try {
            setSaving(true);

            if (editingId !== null) {
                await expenseService.update(
                    editingId,
                    form
                );
            } else {
                await expenseService.create(form);
            }

            await loadData();

            closeModal();
        } catch (error) {
            console.error(
                "Erro ao salvar despesa:",
                error
            );
        } finally {
            setSaving(false);
        }
    }

    function openDeleteModal(id: number) {
        setDeletingId(id);
        setDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        setDeleteModalOpen(false);
        setDeletingId(null);
    }

    async function handleDelete() {
        if (deletingId === null) {
            return;
        }

        try {
            await expenseService.delete(
                deletingId
            );

            setExpenses((previous) =>
                previous.filter(
                    (expense) =>
                        expense.id !== deletingId
                )
            );

            closeDeleteModal();
        } catch (error) {
            console.error(
                "Erro ao excluir despesa:",
                error
            );
        }
    }

    function formatAmount(amount: number) {
        return new Intl.NumberFormat(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        ).format(amount);
    }

    function formatDate(date: string) {
        if (!date) {
            return "-";
        }

        const [
            year,
            month,
            day,
        ] = date.split("-");

        return `${day}/${month}/${year}`;
    }

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Carregando despesas...
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">

            {/* HEADER */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Despesas
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Gerencie as despesas do condomínio.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />

                    Nova despesa
                </button>

            </div>

            {/* TABLE */}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {expenses.length === 0 ? (

                    <div className="flex min-h-[250px] items-center justify-center">

                        <p className="text-sm text-gray-500">
                            Nenhuma despesa cadastrada.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[950px]">

                            <thead className="border-b border-gray-200 bg-gray-50">

                                <tr>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Descrição
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Valor
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Data
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Categoria
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Condomínio
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {expenses.map(
                                    (expense) => (

                                        <tr
                                            key={expense.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                                {expense.description}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                                {formatAmount(
                                                    expense.amount
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {formatDate(
                                                    expense.expenseDate
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {
                                                    categoryLabels[
                                                        expense.category
                                                    ]
                                                }
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {
                                                    expense.condominiumName
                                                }
                                            </td>

                                            <td className="px-5 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                expense
                                                            )
                                                        }
                                                        className="flex size-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                                        title="Editar"
                                                    >
                                                        <Pencil
                                                            size={16}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                expense.id
                                                            )
                                                        }
                                                        className="flex size-8 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                                                        title="Excluir"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                        />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {/* CREATE / EDIT MODAL */}

            {modalOpen && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={closeModal}
                >

                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {/* MODAL HEADER */}

                        <div className="flex items-start justify-between border-b border-gray-200 p-6">

                            <div>

                                <h2 className="text-lg font-bold text-gray-900">

                                    {editingId !== null
                                        ? "Editar despesa"
                                        : "Nova despesa"}

                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Preencha os dados da despesa.
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >

                            {/* DESCRIPTION */}

                            <div>

                                <label
                                    htmlFor="description"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Descrição
                                </label>

                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={
                                        form.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Ex.: Manutenção do elevador"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />

                            </div>

                            {/* AMOUNT */}

                            <div>

                                <label
                                    htmlFor="amount"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Valor
                                </label>

                                <div className="relative">

                                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                        R$
                                    </span>

                                    <input
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={
                                            form.amount === 0
                                                ? ""
                                                : form.amount
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="0,00"
                                        required
                                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                    />

                                </div>

                            </div>

                            {/* EXPENSE DATE */}

                            <div>

                                <label
                                    htmlFor="expenseDate"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Data da despesa
                                </label>

                                <input
                                    id="expenseDate"
                                    name="expenseDate"
                                    type="date"
                                    value={
                                        form.expenseDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />

                            </div>

                            {/* CATEGORY */}

                            <div>

                                <label
                                    htmlFor="category"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Categoria
                                </label>

                                <select
                                    id="category"
                                    name="category"
                                    value={
                                        form.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                >

                                    <option value="">
                                        Selecione uma categoria
                                    </option>

                                    {(
                                        Object.entries(
                                            categoryLabels
                                        ) as [
                                            ExpenseCategory,
                                            string
                                        ][]
                                    ).map(
                                        ([
                                            value,
                                            label,
                                        ]) => (

                                            <option
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* CONDOMINIUM */}

                            <div>

                                <label
                                    htmlFor="condominiumId"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Condomínio
                                </label>

                                <select
                                    id="condominiumId"
                                    name="condominiumId"
                                    value={
                                        form.condominiumId || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                >

                                    <option value="">
                                        Selecione um condomínio
                                    </option>

                                    {condominiums.map(
                                        (condominium) => (

                                            <option
                                                key={
                                                    condominium.id
                                                }
                                                value={
                                                    condominium.id
                                                }
                                            >
                                                {
                                                    condominium.name
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* ACTIONS */}

                            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Salvando..."
                                        : editingId !== null
                                            ? "Salvar alterações"
                                            : "Cadastrar"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* DELETE MODAL */}

            {deleteModalOpen && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={closeDeleteModal}
                >

                    <div
                        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <Trash2 size={22} />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Excluir despesa?
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Essa ação não poderá ser desfeita.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Excluir
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}