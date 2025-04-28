import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register"
import Home from "../pages/tools/Home"
import History from "../pages/tools/History"
import PrivateRoutes from "./private.routes";
import PublicRoutes from "./public.routes";
import { useAuth } from "../context/AuthContext";

function MainRoutes() {
    const { isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return null;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route
                        path="/"
                        element={<Home />} />
                    <Route
                        path="/history"
                        element={<History />} />
                </Route>

                <Route element={<PublicRoutes />}>
                    <Route
                        path="/login"
                        element={<Login />} />
                    <Route
                        path="/register"
                        element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes