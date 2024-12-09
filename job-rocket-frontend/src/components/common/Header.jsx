import React from "react";
import logo from "../../assets/logo.png";
import bell from "../../assets/icon-notification.png";
import profile from "../../assets/profile.png";

import { useNavigate, useLocation } from "react-router";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div
			className="flex w-full top-0 p-2 h-[105px] border border-b--500"
			style={{ fontFamily: "CookieBold" }}
		>
			<div
				className="flex justify-items-start content-center mx-2 cursor-pointer"
				onClick={() => navigate("/board")}
			>
				<img
					src={logo}
					alt="메인로고"
					style={{
						height: "88px",
						width: "100px",
					}}
				/>
				<div className="content-center" style={{ fontSize: "2rem" }}>
					취업 로켓
				</div>
			</div>
			<div
				className="flex p-3 space-x-5 mx-5"
				style={{ fontSize: "1.3rem" }}
			>
				<div
					className={`cursor-pointer content-end ${
						location.pathname.startsWith("/board")
							? "text-blue-500"
							: ""
					}`}
					onClick={() => navigate("/board")}
				>
					게시판
				</div>
				<div
					className={`cursor-pointer content-end ${
						location.pathname.startsWith("/schedule")
							? "text-blue-500"
							: ""
					}`}
					onClick={() => navigate("/schedule")}
				>
					일정 관리
				</div>
				<div
					className={`cursor-pointer content-end ${
						location.pathname.startsWith("/question")
							? "text-blue-500"
							: ""
					}`}
					onClick={() => navigate("/question")}
				>
					면접 질문
				</div>
				<div
					className={`cursor-pointer content-end ${
						location.pathname.startsWith("/site")
							? "text-blue-500"
							: ""
					}`}
					onClick={() => navigate("/site")}
				>
					취준 도움 사이트
				</div>
				<div
					className={`cursor-pointer content-end ${
						location.pathname.startsWith("/career")
							? "text-blue-500"
							: ""
					}`}
					onClick={() => navigate("/career")}
				>
					커리어
				</div>
			</div>
			<div className="flex items-center space-x-4 ml-auto mx-6">
				<img src={profile} alt="프로필이미지" />
				<img src={bell} alt="종" />
			</div>
		</div>
	);
};

export default Header;
