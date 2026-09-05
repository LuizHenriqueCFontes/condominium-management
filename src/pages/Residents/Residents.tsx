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

import residentService from "../../services/residentService";
import userService from "../../services/userService";
import unitService from "../../services/unitService";

import type {
    Resident,
    ResidentRequest,
} from "../../types/resident";

import type { User } from "../../types/user";
import type { Unit } from "../../types/unit";

const initialForm: ResidentRequest = {
    cpf: "",
    phone: "",
    birthDate: "",
    userId: 0,
    unitId: 0,
};

export default function Residents() {

    const [residents, setResidents] = useState<Resident[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [form, setForm] =
        useState<ResidentRequest>(initialForm);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);

            const [
                residentsData,
                usersData,
                unitsData,
            ] = await Promise.all([
                residentService.findAll(),
                userService.findAll(),
                unitService.findAll(),
            ]);

            setResidents(residentsData);
            setUsers(usersData);
            setUnits(unitsData);

        } catch (error) {
            console.error(
                "Erro ao carregar dados:",
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
                name === "userId" ||
                name === "unitId"
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

    function openEditModal(
        resident: Resident
    ) {
        setEditingId(resident.id);

        setForm({
            cpf: resident.cpf,
            phone: resident.phone ?? "",
            birthDate: resident.birthDate ?? "",
            userId: resident.userId,
            unitId: resident.unitId,
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
            form.userId === 0 ||
            form.unitId === 0
        ) {
            return;
        }

        try {
            setSaving(true);

            if (editingId !== null) {
                await residentService.update(
                    editingId,
                    form
                );
            } else {
                await residentService.create(form);
            }

            await loadData();
            closeModal();

        } catch (error) {
            console.error(
                "Erro ao salvar morador:",
                error
            );
        } finally {
            setSaving(false);
        }
    }

    function openDeleteModal(
        id: number
    ) {
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
            await residentService.delete(
                deletingId
            );

            setResidents((previous) =>
                previous.filter(
                    (resident) =>
                        resident.id !== deletingId
                )
            );

            closeDeleteModal();

        } catch (error) {
            console.error(
                "Erro ao excluir morador:",
                error
            );
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Carregando moradores...
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
                        Moradores
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Gerencie os moradores do condomínio.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Novo morador
                </button>

            </div>

            {/* TABLE */}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {residents.length === 0 ? (

                    <div className="flex min-h-[250px] items-center justify-center">
                        <p className="text-sm text-gray-500">
                            Nenhum morador cadastrado.
                        </p>
                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[800px]">

                            <thead className="border-b border-gray-200 bg-gray-50">

                                <tr>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Nome
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        E-mail
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        CPF
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Telefone
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Unidade
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {residents.map(
                                    (resident) => (

                                        <tr
                                            key={resident.id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                                {resident.name}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {resident.email}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {resident.cpf}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {resident.phone || "-"}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {resident.unitNumber}
                                            </td>

                                            <td className="px-5 py-4">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                resident
                                                            )
                                                        }
                                                        className="flex size-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                                        title="Editar"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                resident.id
                                                            )
                                                        }
                                                        className="flex size-8 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 size={16} />
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
                                        ? "Editar morador"
                                        : "Novo morador"}

                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Preencha os dados do morador.
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

                            {/* USER */}

                            <div>

                                <label
                                    htmlFor="userId"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Conta de acesso
                                </label>

                                <select
                                    id="userId"
                                    name="userId"
                                    value={form.userId || ""}
                                    onChange={handleChange}
                                    required
                                    disabled={editingId !== null}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                                >

                                    <option value="">
                                        Selecione uma conta
                                    </option>

                                    {users
                                        .filter(
                                            (user) =>
                                                user.active ||
                                                user.id === form.userId
                                        )
                                        .map(
                                            (user) => (

                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name} -{" "}
                                                    {user.email}
                                                </option>

                                            )
                                        )}

                                </select>

                            </div>

                            {/* CPF */}

                            <div>

                                <label
                                    htmlFor="cpf"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    CPF
                                </label>

                                <input
                                    id="cpf"
                                    name="cpf"
                                    type="text"
                                    value={form.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />

                            </div>

                            {/* PHONE */}

                            <div>

                                <label
                                    htmlFor="phone"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Telefone
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="(61) 99999-9999"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                                />

                            </div>

                            {/* BIRTH DATE */}

                            <div>

                                <label
                                    htmlFor="birthDate"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Data de nascimento
                                </label>

                                <input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    value={form.birthDate}
                                    onChange={handleChange}
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
                                    value={form.unitId || ""}
                                    onChange={handleChange}
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
                                                {unit.number} -{" "}
                                                {unit.blockName}
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
                            Excluir morador?
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

