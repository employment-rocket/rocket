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
import Calendar from "./components/schedule/calendar/Calendar.jsx";
import ScheduleMain from "./components/schedule/schedule/ScheduleMain.jsx";
import Statistics from "./components/schedule/statistics/Statistics.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
		<BrowserRouter>

			<QueryClientProvider client={queryClient}>
				<Header />
				<Routes>
					<Route path="/login/oauth2/callback/kakao" element={<KakaoLogin/>} />
					<Route
						path="/"
						element={<Navigate to="/board" replace />}
					/>
					<Route path="/board" element={<Board />} />
					<Route path="/schedule" element={<Schedule />}>
						<Route index element={<ScheduleMain />} />
						<Route path="calendar" element={<Calendar />} />
						<Route path="statistics" element={<Statistics />} />
					</Route>
					<Route path="/question" element={<Question />} />
					<Route path="/site" element={<Site />} />
					<Route path="/career" element={<Career />} />
				</Routes>
			</QueryClientProvider>
		</BrowserRouter>
);
