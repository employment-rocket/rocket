import React, { createContext, useState, useEffect, useContext } from "react";
import { connectWebSocket, disconnectWebSocket } from "../../api/note/NoteApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		return !!localStorage.getItem("AccessToken");
	});

	useEffect(() => {
		console.log("값 변환됨");
		console.log("Auth state updated:", isAuthenticated);
		if (isAuthenticated) {
			connectWebSocket(handleIncomingMessage);
		} else {
			disconnectWebSocket();
		}
	}, [isAuthenticated]);

	// ✅ localStorage 값이 변경될 때 상태 업데이트
	useEffect(() => {
		const handleStorageChange = () => {
			console.log("LocalStorage changed, updating auth state.");
			setIsAuthenticated(!!localStorage.getItem("AccessToken"));
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const handleIncomingMessage = (message) => {
		console.log("Received message:", message);
	};

	const login = () => {
		console.log("Logging in...??");
		setIsAuthenticated(true);
	};

	const logout = () => {
		console.log("Logging out...");
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
