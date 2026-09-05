import {
    Navigate,
    Route,
    Routes,
} from "react-router";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PrivateLayout from "../layouts/PrivateLayout/PrivateLayout";
import Condominiums from "../pages/Condominiums/Condominiums";
import Blocks from "../pages/Blocks/Blocks";
import Units from "../pages/Units/Units";
import Residents from "../pages/Residents/Residents";
import Expenses from "../pages/Expenses/Expenses";
import Revenues from "../pages/Revenues/Revenues";
import Charges from "../pages/Charge/Charge";

export default function AppRoutes() {

    return (
            <Routes>

                {/* Rotas públicas */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Rotas protegidas */}

                <Route element={<PrivateRoute />}>

                    <Route element={<PrivateLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/condominiums"
                            element={<Condominiums />}
                        />

                        
                        <Route
                            path="/units"
                            element={<Units />}
                        />

                        <Route
                            path="/residents"
                            element={<Residents />}
                        />

                        <Route 
                            path="/revenues"
                            element={<Revenues />}
                        />

                        <Route 
                            path="/charges"
                            element={<Charges />}
                        />

                        <Route
                            path="/expenses"
                            element={<Expenses />}
                        />

                        <Route
                        path="/blocks"
                        element={<Blocks />}
                        
                    />

                    </Route>

                </Route>

                {/* Fallback */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

    );
}