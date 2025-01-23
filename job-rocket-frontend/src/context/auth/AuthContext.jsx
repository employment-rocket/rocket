import React, { createContext, useState, useEffect, useContext } from "react";
import { connectWebSocket, disconnectWebSocket } from "../../api/note/NoteApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("AccessToken");
            setIsAuthenticated(!!token);
            if (token) {
                connectWebSocket(handleIncomingMessage);
            }
        };

        checkAuth();

        const interval = setInterval(checkAuth, 1000);

        return () => {
            clearInterval(interval);
            disconnectWebSocket();
        };
    }, []);

    const handleIncomingMessage = (message) => {
        console.log("Received message:", message);
    };

    const login = () => {
        setIsAuthenticated(true);
        connectWebSocket(handleIncomingMessage);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        disconnectWebSocket();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
