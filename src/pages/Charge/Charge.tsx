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

import chargeService from "../../services/chargeService";
import unitService from "../../services/unitService";

import type {
    Charge,
    ChargeRequest,
    ChargeStatus,
} from "../../types/charge";

import type { Unit } from "../../types/unit";

const initialForm: ChargeRequest = {
    description: "",
    amount: 0,
    dueDate: "",
    referenceMonth: "",
    unitId: 0,
};

const statusLabels: Record<ChargeStatus, string> = {
    PENDING: "Pendente",
    PAID: "Pago",
    OVERDUE: "Vencido",
    CANCELLED: "Cancelado",
};

const statusClasses: Record<ChargeStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-green-100 text-green-700",
    OVERDUE: "bg-red-100 text-red-700",
    CANCELLED: "bg-gray-100 text-gray-600",
};

export default function Charges() {
    const [charges, setCharges] = useState<Charge[]>([]);

    const [units, setUnits] = useState<Unit[]>([]);

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
        useState<ChargeRequest>(initialForm);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);

            const [
                chargesData,
                unitsData,
            ] = await Promise.all([
                chargeService.findAll(),
                unitService.findAll(),
            ]);

            setCharges(chargesData);
            setUnits(unitsData);
        } catch (error) {
            console.error(
                "Erro ao carregar cobranças:",
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
                name === "unitId"
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

    function openEditModal(charge: Charge) {
        setEditingId(charge.id);

        setForm({
            description: charge.description,
            amount: charge.amount,
            dueDate: charge.dueDate,
            referenceMonth: charge.referenceMonth,
            unitId: charge.unitId,
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
            form.unitId === 0 ||
            form.referenceMonth === ""
        ) {
            return;
        }

        try {
            setSaving(true);

            if (editingId !== null) {
                await chargeService.update(
                    editingId,
                    form
                );
            } else {
                await chargeService.create(form);
            }

            await loadData();

            closeModal();
        } catch (error) {
            console.error(
                "Erro ao salvar cobrança:",
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
            await chargeService.delete(
                deletingId
            );

            setCharges((previous) =>
                previous.filter(
                    (charge) =>
                        charge.id !== deletingId
                )
            );

            closeDeleteModal();
        } catch (error) {
            console.error(
                "Erro ao excluir cobrança:",
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
                    Carregando cobranças...
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
                        Cobranças
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Gerencie as cobranças das unidades.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />

                    Nova cobrança
                </button>

            </div>

            {/* TABLE */}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {charges.length === 0 ? (

                    <div className="flex min-h-[250px] items-center justify-center">

                        <p className="text-sm text-gray-500">
                            Nenhuma cobrança cadastrada.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1050px]">

                            <thead className="border-b border-gray-200 bg-gray-50">

                                <tr>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Descrição
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Unidade
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Valor
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Vencimento
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Referência
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {charges.map(
                                    (charge) => (

                                        <tr
                                            key={charge.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                                {charge.description}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {charge.unitNumber}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                                {formatAmount(
                                                    charge.amount
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {formatDate(
                                                    charge.dueDate
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {charge.referenceMonth}
                                            </td>

                                            <td className="px-5 py-4">

                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[charge.status]}`}
                                                >
                                                    {
                                                        statusLabels[
                                                            charge.status
                                                        ]
                                                    }
                                                </span>

                                            </td>

                                            <td className="px-5 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                charge
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
                                                                charge.id
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
                                        ? "Editar cobrança"
                                        : "Nova cobrança"}

                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Preencha os dados da cobrança.
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
                                    placeholder="Ex.: Taxa condominial"
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

                            {/* DUE DATE */}

                            <div>

                                <label
                                    htmlFor="dueDate"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Data de vencimento
                                </label>

                                <input
                                    id="dueDate"
                                    name="dueDate"
                                    type="date"
                                    value={
                                        form.dueDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />

                            </div>

                            {/* REFERENCE MONTH */}

                            <div>

                                <label
                                    htmlFor="referenceMonth"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Mês de referência
                                </label>

                                <input
                                    id="referenceMonth"
                                    name="referenceMonth"
                                    type="month"
                                    value={
                                        form.referenceMonth
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />

                            </div>

                            {/* UNIT */}

                            <div>

                                <label
                                    htmlFor="unitId"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Unidade
                                </label>

                                <select
                                    id="unitId"
                                    name="unitId"
                                    value={
                                        form.unitId || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                >

                                    <option value="">
                                        Selecione uma unidade
                                    </option>

                                    {units.map(
                                        (unit) => (

                                            <option
                                                key={unit.id}
                                                value={unit.id}
                                            >
                                                Unidade {unit.number}
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
                            Excluir cobrança?
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

