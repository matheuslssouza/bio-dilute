import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (tokenParam) => {
    localStorage.setItem('token', tokenParam);
    setToken(tokenParam);
    setIsAuthenticated(true);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setIsAuthenticated(data.authenticate); // ajuste conforme a resposta do backend

        if (!data.authenticate) {
          logout();
        }

        setIsAuthLoading(false);
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        setIsAuthenticated(false);
        setIsAuthLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, setIsAuthenticated, login, logout, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used in a AuthProvider');
  }

  return context;
};