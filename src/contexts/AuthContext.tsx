import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import { authStorage } from "../services/authStorage";

interface AuthContextData {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        authStorage.isAuthenticated()
    );

    function login(token: string) {
        authStorage.setToken(token);
        setIsAuthenticated(true);
    }

    function logout() {
        authStorage.removeToken();
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser utilizado dentro de AuthProvider"
        );
    }

    return context;
}