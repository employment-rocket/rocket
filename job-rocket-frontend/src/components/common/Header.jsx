import React from "react";
import logo from "../../assets/logo.png";
import bell from "../../assets/icon-notification.png";

import { useNavigate } from "react-router";

const Header = () => {
	const navigate = useNavigate();

	return (
		<div
			className="flex w-full top-0 p-2 h-[105px] border border-b--500"
			style={{ fontFamily: "CookieBold" }}
		>
			<div
				className="flex justify-items-start content-center mx-2"
				onClick={() => navigate("/")}
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
				<div className="content-end " onClick={() => navigate("/")}>
					게시판
				</div>
				<div
					className="content-end "
					onClick={() => navigate("/schedule")}
				>
					일정 관리
				</div>
				<div
					className="content-end "
					onClick={() => navigate("/question")}
				>
					면접 질문
				</div>
				<div className="content-end " onClick={() => navigate("/site")}>
					취준 도움 사이트
				</div>
				<div
					className="content-end "
					onClick={() => navigate("/career")}
				>
					커리어
				</div>
			</div>
			<div className="flex items-center space-x-4 ml-auto mx-6">
				<div>프로필</div>
				<img src={bell} alt="종" />
			</div>
		</div>
	);
};

export default Header;
