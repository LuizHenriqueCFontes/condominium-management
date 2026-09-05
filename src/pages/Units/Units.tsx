import { useEffect, useState } from "react";
import {
    Home,
    Pencil,
    Plus,
    Trash2,
    X,
    AlertTriangle,
} from "lucide-react";

import unitService from "../../services/unitService";
import blockService from "../../services/blockService";

import type { Unit, UnitRequest } from "../../types/unit";
import type { Block } from "../../types/block";

const emptyForm: UnitRequest = {
    number: "",
    floor: null,
    type: "",
    status: "",
    blockId: 0,
};

export default function Units() {

    const [units, setUnits] = useState<Unit[]>([]);

    const [blocks, setBlocks] = useState<Block[]>([]);

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [form, setForm] =
        useState<UnitRequest>(emptyForm);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [deleteId, setDeleteId] =
        useState<number | null>(null);

    const [deleting, setDeleting] = useState(false);


    async function loadData() {

        try {

            setLoading(true);
            setError("");

            const [unitsData, blocksData] =
                await Promise.all([
                    unitService.findAll(),
                    blockService.findAll(),
                ]);

            setUnits(unitsData);
            setBlocks(blocksData);

        } catch (error) {

            console.error(error);

            setError(
                "Não foi possível carregar os dados."
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {
        loadData();
    }, []);


    function openCreateModal() {

        setEditingId(null);

        setForm(emptyForm);

        setError("");

        setModalOpen(true);
    }


    function openEditModal(unit: Unit) {

        setEditingId(unit.id);

        setForm({
            number: unit.number,
            floor: unit.floor,
            type: unit.type,
            status: unit.status,
            blockId: unit.blockId,
        });

        setError("");

        setModalOpen(true);
    }


    function closeModal() {

        if (saving) {
            return;
        }

        setModalOpen(false);

        setEditingId(null);

        setForm(emptyForm);
    }


    function handleChange(
        field: keyof UnitRequest,
        value: string | number | null
    ) {

        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }


    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        if (form.blockId === 0) {

            setError(
                "Selecione um bloco."
            );

            return;
        }

        if (!form.type) {

            setError(
                "Selecione o tipo da unidade."
            );

            return;
        }

        if (!form.status) {

            setError(
                "Selecione o status da unidade."
            );

            return;
        }

        try {

            setSaving(true);
            setError("");

            if (editingId === null) {

                await unitService.create(form);

            } else {

                await unitService.update(
                    editingId,
                    form
                );
            }

            closeModal();

            await loadData();

        } catch (error) {

            console.error(error);

            setError(
                "Não foi possível salvar a unidade."
            );

        } finally {

            setSaving(false);

        }
    }


    function openDeleteModal(id: number) {

        setDeleteId(id);
    }


    function closeDeleteModal() {

        if (deleting) {
            return;
        }

        setDeleteId(null);
    }


    async function handleDelete() {

        if (deleteId === null) {
            return;
        }

        try {

            setDeleting(true);

            setError("");

            await unitService.delete(deleteId);

            setUnits((current) =>
                current.filter(
                    (unit) =>
                        unit.id !== deleteId
                )
            );

            setDeleteId(null);

        } catch (error) {

            console.error(error);

            setError(
                "Não foi possível excluir a unidade."
            );

        } finally {

            setDeleting(false);

        }
    }


    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                            <Home size={22} />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Unidades
                        </h1>

                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        Gerencie as unidades dos blocos.
                    </p>

                </div>


                <button
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={19} />

                    Nova unidade
                </button>

            </div>


            {/* Erro */}

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}


            {/* Tabela */}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                {loading ? (

                    <div className="flex items-center justify-center p-10">

                        <p className="text-sm text-slate-500">
                            Carregando unidades...
                        </p>

                    </div>

                ) : units.length === 0 ? (

                    <div className="flex flex-col items-center justify-center p-10 text-center">

                        <Home
                            size={40}
                            className="text-slate-300"
                        />

                        <h2 className="mt-4 font-semibold text-slate-700">
                            Nenhuma unidade cadastrada
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Comece cadastrando a primeira unidade.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="border-b border-slate-200 bg-slate-50">

                                <tr>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Unidade
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Andar
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Tipo
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Bloco
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                                        Ações
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {units.map((unit) => (

                                    <tr
                                        key={unit.id}
                                        className="transition hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="font-medium text-slate-900">
                                                {unit.number}
                                            </div>

                                        </td>


                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {unit.floor ?? "-"}
                                        </td>


                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {unit.type}
                                        </td>


                                        <td className="px-6 py-4">

                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                {unit.status}
                                            </span>

                                        </td>


                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {unit.blockName}
                                        </td>


                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() =>
                                                        openEditModal(
                                                            unit
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            unit.id
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* Modal criar / editar */}

            {modalOpen && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeModal();
                        }

                    }}
                >

                    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* Header */}

                        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <Home size={20} />
                                </div>

                                <div>

                                    <h2 className="text-lg font-semibold text-slate-900">
                                        {editingId === null
                                            ? "Nova unidade"
                                            : "Editar unidade"}
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        {editingId === null
                                            ? "Cadastre uma nova unidade."
                                            : "Atualize os dados da unidade."}
                                    </p>

                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6"
                        >

                            <div className="space-y-5">

                                {/* Número + Andar */}

                                <div className="grid gap-5 sm:grid-cols-2">

                                    <div>

                                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                            Número
                                        </label>

                                        <input
                                            value={form.number}
                                            onChange={(event) =>
                                                handleChange(
                                                    "number",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Ex.: 101"
                                            required
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                        />

                                    </div>


                                    <div>

                                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                            Andar
                                        </label>

                                        <input
                                            type="number"
                                            value={
                                                form.floor ?? ""
                                            }
                                            onChange={(event) =>
                                                handleChange(
                                                    "floor",
                                                    event.target.value === ""
                                                        ? null
                                                        : Number(
                                                            event.target.value
                                                        )
                                                )
                                            }
                                            placeholder="Ex.: 1"
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                        />

                                    </div>

                                </div>


                                {/* Tipo */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Tipo
                                    </label>

                                    <select
                                        value={form.type}
                                        onChange={(event) =>
                                            handleChange(
                                                "type",
                                                event.target.value
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                    >

                                        <option value="">
                                            Selecione o tipo
                                        </option>

                                        <option value="APARTMENT">
                                            Apartamento
                                        </option>

                                        <option value="HOUSE">
                                            Casa
                                        </option>

                                        <option value="COMMERCIAL">
                                            Comercial
                                        </option>

                                    </select>

                                </div>


                                {/* Status */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Status
                                    </label>

                                    <select
                                        value={form.status}
                                        onChange={(event) =>
                                            handleChange(
                                                "status",
                                                event.target.value
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                    >

                                        <option value="">
                                            Selecione o status
                                        </option>

                                        <option value="OCCUPIED">
                                            Ocupada
                                        </option>

                                        <option value="VACANT">
                                            Vago
                                        </option>

                                    </select>

                                </div>


                                {/* Bloco */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Bloco
                                    </label>

                                    <select
                                        value={
                                            form.blockId
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                "blockId",
                                                Number(
                                                    event.target.value
                                                )
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                    >

                                        <option value={0}>
                                            Selecione um bloco
                                        </option>

                                        {blocks.map(
                                            (block) => (

                                                <option
                                                    key={
                                                        block.id
                                                    }
                                                    value={
                                                        block.id
                                                    }
                                                >
                                                    {block.name}
                                                    {" — "}
                                                    {block.condominiumName}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                            </div>


                            {/* Footer */}

                            <div className="mt-7 flex justify-end gap-3 border-t border-slate-200 pt-5">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancelar
                                </button>


                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving
                                        ? "Salvando..."
                                        : editingId === null
                                            ? "Cadastrar unidade"
                                            : "Salvar alterações"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* Modal de exclusão */}

            {deleteId !== null && (

                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeDeleteModal();
                        }

                    }}
                >

                    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

                        <div className="p-6">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                                    <AlertTriangle size={22} />
                                </div>

                                <div>

                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Excluir unidade
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Tem certeza de que deseja excluir esta unidade?
                                    </p>

                                    <p className="text-sm leading-6 text-slate-500">
                                        Essa ação não poderá ser desfeita.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                disabled={deleting}
                                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancelar
                            </button>


                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <Trash2 size={17} />

                                {deleting
                                    ? "Excluindo..."
                                    : "Excluir"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}