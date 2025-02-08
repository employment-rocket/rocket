import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Free from "./components/board/free/Free.jsx";
import FreeBoardForm from "./components/board/free/FreeBoardForm.jsx";
import FreeBoardUpdate from "./components/board/free/FreeBoardUpdate.jsx";
import FreeBoardView from "./components/board/free/FreeBoardView.jsx";
import MainBoard from "./components/board/main/MainBoard.jsx";
import Notice from "./components/board/notice/Notice.jsx";
import Qa from "./components/board/question/Qa.jsx";
import Review from "./components/board/review/Review.jsx";
import Header from "./components/common/Header.jsx";
import PrivateRoute from "./components/common/PrivateRoute";
import KakaoLogin from "./components/oauth/KakaoLogin";
import NaverLogin from "./components/oauth/NaverLogin";
import ScheduleMain from "./components/schedule/schedule/ScheduleMain.jsx";
import Statistics from "./components/schedule/statistics/Statistics.jsx";
import "./index.css";
import Board from "./pages/Board.jsx";
import Career from "./pages/Career.jsx";
import Profile from "./pages/Profile.jsx";
import Question from "./pages/Question.jsx";
import Retrospect from "./pages/Retrospect";
import Schedule from "./pages/Schedule.jsx";
import Site from "./pages/Site.jsx";
import TalentPool from './pages/TalentPool.jsx'
import CardUserDetail from "./components/talentPool/talentPoolComponents/CardUserDetail.jsx";


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
				<Route
					path="/login/oauth2/code/naver"
					element={<NaverLogin />}
				/>
				<Route path="/" element={<Navigate to="/board" replace />} />
				<Route path="/board" element={<Board />}>
					<Route index element={<MainBoard />} />
					<Route path="notice" element={<Notice />} />
					<Route path="free" element={<Free />} />
					<Route path="free/:boardId" element={<FreeBoardView />} />
					<Route element={<PrivateRoute />}>
						<Route path="free/form" element={<FreeBoardForm />} />
						<Route
							path="free/form/:boardId"
							element={<FreeBoardUpdate />}
						/>
					</Route>
					<Route path="qa" element={<Qa />} />
					<Route path="review" element={<Review />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/schedule" element={<Schedule />}>
						<Route index element={<ScheduleMain />} />
						<Route path="statistics" element={<Statistics />} />
					</Route>

					<Route path="/retrospect" element={<Retrospect />} />
					<Route path="/question" element={<Question />} />

					<Route path="/profile" element={<Profile />} />
					<Route path="/career" element={<Career />} />
          <Route path="/talent" element={<TalentPool />} />
          <Route path="/card/:memberId" element={<CardUserDetail />} />
          
				</Route>

				<Route path="/site" element={<Site />} />
			</Routes>
		</QueryClientProvider>
	</BrowserRouter>
);
