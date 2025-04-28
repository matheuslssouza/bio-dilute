import { Navigate, Outlet } from "react-router-dom"
import React from "react"
import { useAuth } from "../context/AuthContext"

function PublicRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        !isAuthenticated ? <Outlet /> : <Navigate to="/" />
    )
}

export default PublicRoutes