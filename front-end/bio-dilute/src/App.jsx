import MainRoutes from "./routes/routes";
import React from "react";
import { AuthProvider } from "./context/AuthContext";

function App() {

    return (
        <AuthProvider>
            <MainRoutes />
        </AuthProvider>
    )
}

export default App;