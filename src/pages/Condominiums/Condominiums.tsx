import { useEffect, useState } from "react";
import {
    Building2,
    Pencil,
    Plus,
    Trash2,
    X,
    AlertTriangle,
} from "lucide-react";

import condominiumService from "../../services/condominiumService";
import type {
    Condominium,
    CondominiumRequest,
} from "../../types/condominium";

const emptyForm: CondominiumRequest = {
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    address: "",
    status: "ACTIVE",
};

export default function Condominiums() {

    const [condominiums, setCondominiums] = useState<Condominium[]>([]);

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    const [form, setForm] =
        useState<CondominiumRequest>(emptyForm);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    async function loadCondominiums() {

        try {

            setLoading(true);
            setError("");

            const data =
                await condominiumService.findAll();

            setCondominiums(data);

        } catch (error) {

            console.error(error);

            setError(
                "Não foi possível carregar os condomínios."
            );

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {
        loadCondominiums();
    }, []);

    function openCreateModal() {

        setEditingId(null);
        setForm(emptyForm);
        setModalOpen(true);
        setError("");
    }

    function openEditModal(condominium: Condominium) {

        setEditingId(condominium.id);

        setForm({
            name: condominium.name,
            cnpj: condominium.cnpj,
            email: condominium.email,
            phone: condominium.phone,
            address: condominium.address,
            status: condominium.status,
        });

        setModalOpen(true);
        setError("");
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
        field: keyof CondominiumRequest,
        value: string
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

        try {

            setSaving(true);
            setError("");

            if (editingId === null) {

                await condominiumService.create(form);

            } else {

                await condominiumService.update(
                    editingId,
                    form
                );
            }

            closeModal();

            await loadCondominiums();

        } catch (error) {

            console.error(error);

            setError(
                "Não foi possível salvar o condomínio."
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

        await condominiumService.delete(deleteId);

        setCondominiums((current) =>
            current.filter(
                (condominium) =>
                    condominium.id !== deleteId
            )
        );

        setDeleteId(null);

    } catch (error) {

        console.error(error);

        setError(
            "Não foi possível excluir o condomínio."
        );

    } finally {

        setDeleting(false);

    }
}

    return (
        <div className="space-y-6">

            {/* Cabeçalho */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                            <Building2 size={22} />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Condomínios
                        </h1>

                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                        Gerencie os condomínios cadastrados no sistema.
                    </p>

                </div>

                <button
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={19} />
                    Novo condomínio
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
                            Carregando condomínios...
                        </p>
                    </div>

                ) : condominiums.length === 0 ? (

                    <div className="flex flex-col items-center justify-center p-10 text-center">

                        <Building2
                            size={40}
                            className="text-slate-300"
                        />

                        <h2 className="mt-4 font-semibold text-slate-700">
                            Nenhum condomínio cadastrado
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Comece cadastrando o primeiro condomínio.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="border-b border-slate-200 bg-slate-50">

                                <tr>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Nome
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        CNPJ
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Telefone
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {condominiums.map((condominium) => (

                                    <tr
                                        key={condominium.id}
                                        className="transition hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="font-medium text-slate-900">
                                                {condominium.name}
                                            </div>

                                            <div className="text-sm text-slate-500">
                                                {condominium.email || "-"}
                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {condominium.cnpj}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {condominium.phone || "-"}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                {condominium.status}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    onClick={() =>
                                                        openEditModal(
                                                            condominium
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                                    title="Editar"
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                <button
                                                    onClick={() =>
    openDeleteModal(condominium.id)
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

            {/* Modal */}

            {modalOpen && (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
                closeModal();
            }
        }}
    >
        <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Header do modal */}

            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">

                <div>
                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Building2 size={20} />
                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                {editingId === null
                                    ? "Novo condomínio"
                                    : "Editar condomínio"}
                            </h2>

                            <p className="mt-0.5 text-sm text-slate-500">
                                {editingId === null
                                    ? "Cadastre um novo condomínio no sistema."
                                    : "Atualize os dados do condomínio."}
                            </p>

                        </div>

                    </div>
                </div>

                <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Fechar"
                >
                    <X size={20} />
                </button>

            </div>

            {/* Formulário */}

            <form
                onSubmit={handleSubmit}
                className="p-6"
            >

                <div className="space-y-5">

                    {/* Nome */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Nome
                        </label>

                        <input
                            value={form.name}
                            onChange={(event) =>
                                handleChange(
                                    "name",
                                    event.target.value
                                )
                            }
                            placeholder="Ex.: Residencial Jardim das Flores"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                        />
                    </div>

                    {/* CNPJ + Telefone */}

                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                CNPJ
                            </label>

                            <input
                                value={form.cnpj}
                                onChange={(event) =>
                                    handleChange(
                                        "cnpj",
                                        event.target.value
                                    )
                                }
                                placeholder="00.000.000/0000-00"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Telefone
                            </label>

                            <input
                                value={form.phone}
                                onChange={(event) =>
                                    handleChange(
                                        "phone",
                                        event.target.value
                                    )
                                }
                                placeholder="(61) 99999-9999"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                            />
                        </div>

                    </div>

                    {/* E-mail */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            E-mail
                        </label>

                        <input
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                                handleChange(
                                    "email",
                                    event.target.value
                                )
                            }
                            placeholder="contato@condominio.com"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                        />
                    </div>

                    {/* Endereço */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Endereço
                        </label>

                        <input
                            value={form.address}
                            onChange={(event) =>
                                handleChange(
                                    "address",
                                    event.target.value
                                )
                            }
                            placeholder="Ex.: SQN 100, Brasília - DF"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                        />
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
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                        >
                            <option value="ACTIVE">
                                Ativo
                            </option>

                            <option value="INACTIVE">
                                Inativo
                            </option>
                        </select>
                    </div>

                </div>

                {/* Footer */}

                <div className="mt-7 flex justify-end gap-3 border-t border-slate-200 pt-5">

                    <button
                        type="button"
                        onClick={closeModal}
                        disabled={saving}
                        className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving
                            ? "Salvando..."
                            : editingId === null
                                ? "Cadastrar condomínio"
                                : "Salvar alterações"}
                    </button>

                </div>

            </form>

        </div>
    </div>
)}

{deleteId !== null && (
    <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
                closeDeleteModal();
            }
        }}
    >
        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Conteúdo */}

            <div className="p-6">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <AlertTriangle size={22} />
                    </div>

                    <div>

                        <h2 className="text-lg font-semibold text-slate-900">
                            Excluir condomínio
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Tem certeza de que deseja excluir este
                            condomínio?
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Essa ação não poderá ser desfeita.
                        </p>

                    </div>

                </div>

            </div>

            {/* Ações */}

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

                <button
                    type="button"
                    onClick={closeDeleteModal}
                    disabled={deleting}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-50"
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