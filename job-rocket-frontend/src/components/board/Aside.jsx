import React from "react";
import { useLocation, useNavigate } from "react-router";

const Aside = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const categories = [
		{ name: "공지", path: "/board" },
		{ name: "자유 게시판", path: "/board/free" },
		{ name: "질문 게시판", path: "/board/qa" },
		{ name: "후기 게시판", path: "/board/review" },
	];

	const isActive = (path) => {
		if (path === "/board") {
			return location.pathname === "/board";
		} else {
			return location.pathname.startsWith(path);
		}
	};

	return (
		<div
			className="flex flex-col items-center border rounded-lg h-[66vh] shadow-sm shadow-gray-500 p-5 justify-center space-y-3"
			style={{ fontFamily: "CookieBold" }}
		>
			{categories.map(({ name, path }) => {
				const active = isActive(path);
				return (
					<button
						key={path}
						onClick={() => navigate(path)}
						className={`${
							active ? " text-blue-500" : "text-black"
						}`}
					>
						{name}
					</button>
				);
			})}
		</div>
	);
};

export default Aside;
