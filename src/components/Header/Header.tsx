import { Menu, UserRound } from "lucide-react";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({
    onMenuClick,
}: HeaderProps) {

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">

            <button
                onClick={onMenuClick}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
                <Menu size={22} />
            </button>

            <div className="ml-auto flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <UserRound size={19} />
                </div>

                <span className="hidden text-sm font-medium text-slate-700 sm:block">
                    Administrador
                </span>

            </div>

        </header>
    );
}