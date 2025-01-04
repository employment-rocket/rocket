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
import PrivateRoute from "./components/common/PrivateRoute";
import Retrospect from "./pages/Retrospect";
import MyPage from "./pages/MyPage";
import Note from "./pages/Note";
import Statistics from "./components/schedule/statistics/Statistics.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScheduleHome from "./components/schedule/ScheduleHome.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Header />
			<Routes>
				<Route
					path="/login/oauth2/callback/kakao"
					element={<KakaoLogin />}
				/>
				<Route path="/" element={<Navigate to="/board" replace />} />
				<Route path="/board" element={<Board />} />

				<Route element={<PrivateRoute />}>
					<Route path="/schedule" element={<Schedule />}>
						<Route index element={<ScheduleHome />} />
						<Route path="statistics" element={<Statistics />} />
					</Route>
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/retrospect" element={<Retrospect />} />
					<Route path="/note" element={<Note />} />
				</Route>
				<Route path="/question" element={<Question />} />
				<Route path="/site" element={<Site />} />
				<Route path="/career" element={<Career />} />
			</Routes>
		</QueryClientProvider>
	</BrowserRouter>
);
