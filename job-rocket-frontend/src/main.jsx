import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/common/Header.jsx";
import Board from "./pages/Board.jsx";
import Career from "./pages/Career.jsx";
import Schedule from "./pages/Schedule.jsx";
import Question from "./pages/Question.jsx";
import Site from "./pages/Site.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Board />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/question" element={<Question />} />
				<Route path="/site" element={<Site />} />
				<Route path="/career" element={<Career />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
