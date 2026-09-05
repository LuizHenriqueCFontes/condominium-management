import {
    BarChart3,
    Building2,
    ChevronLeft,
    ChevronRight,
    CircleDollarSign,
    FileText,
    Home,
    LogOut,
    Receipt,
    Users,
} from "lucide-react";

import { NavLink } from "react-router";

import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobile?: boolean;
    onNavigate?: () => void;
}

export default function Sidebar({
    collapsed,
    onToggle,
    mobile = false,
    onNavigate,
}: SidebarProps) {
    const { logout } = useAuth();

    const links = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: BarChart3,
        },
        {
            label: "Condomínios",
            path: "/condominiums",
            icon: Building2,
        },
        {
            label: "Blocos",
            path: "/blocks",
            icon: Home,
        },
        {
            label: "Unidades",
            path: "/units",
            icon: Home,
        },
        {
            label: "Moradores",
            path: "/residents",
            icon: Users,
        },
        {
            label: "Receitas",
            path: "/revenues",
            icon: CircleDollarSign,
        },
        {
            label: "Despesas",
            path: "/expenses",
            icon: Receipt,
        },
        {
            label: "Cobranças",
            path: "/charges",
            icon: FileText,
        },
    ];

    return (
        <aside
            className={`${
                mobile ? "flex" : "hidden lg:flex"
            } min-h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
                collapsed ? "w-20" : "w-64"
            }`}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
                {!collapsed && (
                    <span className="text-xl font-bold text-blue-600">
                        Condominium
                    </span>
                )}

                <button
                    onClick={onToggle}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    title={collapsed ? "Expandir" : "Recolher"}
                >
                    {collapsed ? (
                        <ChevronRight size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>
            </div>

            {/* Navegação */}
            <nav className="flex-1 space-y-1 p-3">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            <Icon size={20} />

                            {!collapsed && (
                                <span>{link.label}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-200 p-3">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={20} />

                    {!collapsed && (
                        <span>Sair</span>
                    )}
                </button>
            </div>
        </aside>
    );
}

