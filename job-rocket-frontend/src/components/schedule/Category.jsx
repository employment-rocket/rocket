import React from "react";
import { useNavigate, useLocation } from "react-router";

const Category = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const categories = [
		{ name: "일정 관리", path: "/schedule" },
		{ name: "통계", path: "/schedule/statistics" },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<div
			className="flex space-x-4 bg-white py-4 px-6 shadow-md"
			style={{ fontFamily: "CookieBold" }}
		>
			{categories.map(({ name, path }) => {
				const active = isActive(path);
				return (
					<button
						key={path}
						onClick={() => navigate(path)}
						className={`w-40 px-6 py-3 text-sm font-medium rounded-lg ${
							active
								? "bg-blue-500 text-white"
								: "bg-gray-100 text-gray-600"
						} hover:bg-blue-100`}
					>
						{name}
					</button>
				);
			})}
		</div>
	);
};

export default Category;
