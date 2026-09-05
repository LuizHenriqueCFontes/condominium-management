import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}