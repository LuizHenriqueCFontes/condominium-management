import { useState } from "react";
import { useNavigate } from "react-router";

import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import type {
    LoginRequest,
    LoginResponse,
} from "../../types/auth";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {

        event.preventDefault();

        setError("");
        setLoading(true);

        const data: LoginRequest = {
            email,
            password,
        };

        try {

            const response = await api.post<LoginResponse>(
                "/api/auth/login",
                data
            );

            login(response.data.token);

            navigate("/dashboard");

        } catch (error) {

            setError("E-mail ou senha inválidos.");

        } finally {

            setLoading(false);

        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Condominium
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Gestão condominial
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            E-mail
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="seu@email.com"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    <div>

                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Senha
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="••••••••"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                </form>

            </section>

        </main>
    );
}