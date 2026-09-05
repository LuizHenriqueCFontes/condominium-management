import { useState } from "react";

import { Outlet } from "react-router";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function PrivateLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar Desktop */}
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
            />

            {/* Sidebar Mobile */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="relative z-10 h-full w-64">
                        <Sidebar
                            collapsed={false}
                            onToggle={() => setMobileOpen(false)}
                            mobile
                            onNavigate={() => setMobileOpen(false)}
                        />
                    </div>
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Header
                    onMenuClick={() => setMobileOpen(true)}
                />

                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
