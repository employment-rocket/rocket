import React, { useState } from "react";
import logo from "../../assets/logo.png";
import bell from "../../assets/icon-notification.png";
import profile from "../../assets/profile.png";
import LoginPage from "../../pages/Login";

import { useNavigate, useLocation } from "react-router";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isModalOpen, setModalOpen] = useState(false);

	return (
		<div
			className="flex items-center w-full top-0 h-[60px] px-6 border-b border-gray-300"
			style={{ fontFamily: "CookieBold" }}
		>
			<div
				className="flex items-center cursor-pointer border-r border-gray-300 pr-6"
				onClick={() => navigate("/board")}
			>
				<img
					src={logo}
					alt="메인로고"
					className="h-8 w-8 mr-2"
				/>
				<div className="text-lg font-bold">취업 로켓</div>
			</div>

			<div className="flex space-x-6 ml-6 text-base">
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/board")
						? "text-blue-500 font-semibold"
						: "text-gray-700"
						}`}
					onClick={() => navigate("/board")}
				>
					게시판
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/schedule")
						? "text-blue-500 font-semibold"
						: "text-gray-700"
						}`}
					onClick={() => navigate("/schedule")}
				>
					일정 관리
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/question")
						? "text-blue-500 font-semibold"
						: "text-gray-700"
						}`}
					onClick={() => navigate("/question")}
				>
					면접 질문
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/site")
						? "text-blue-500 font-semibold"
						: "text-gray-700"
						}`}
					onClick={() => navigate("/site")}
				>
					취준 도움 사이트
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/career")
						? "text-blue-500 font-semibold"
						: "text-gray-700"
						}`}
					onClick={() => navigate("/career")}
				>
					커리어
				</div>
			</div>

			<div className="flex items-center space-x-4 ml-auto">
				<img
					src={profile}
					alt="프로필이미지"
					className="h-6 w-6 cursor-pointer"
					onClick={() => setModalOpen(true)}
				/>
				<img src={bell} alt="알림" className="h-6 w-6 cursor-pointer" />
			</div>

			<LoginPage isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
		</div>
	);
};

export default Header;
