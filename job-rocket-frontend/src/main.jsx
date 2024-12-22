import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Header from "./components/common/Header.jsx";
import Board from "./pages/Board.jsx";
import Career from "./pages/Career.jsx";
import Schedule from "./pages/Schedule.jsx";
import Question from "./pages/Question.jsx";
import Site from "./pages/Site.jsx";
import LoginPage from "./pages/Login.jsx";
import KakaoLogin from "./components/oauth/KakaoLogin";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
		<Route path="/login/oauth2/callback/kakao" element={<KakaoLogin/>} />
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to="/board" replace />} />
				<Route path="/board" element={<Board />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/question" element={<Question />} />
				<Route path="/site" element={<Site />} />
				<Route path="/career" element={<Career />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
