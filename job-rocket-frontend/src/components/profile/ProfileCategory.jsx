import React from "react";
import { useNavigate, useLocation } from "react-router";

const ProfileCategory = ({}) => {
	const navigate = useNavigate();
	const location = useLocation();

	const categories = [
		{ name: "프로필 보기", path: "/career" },
		{ name: "프로필 작성", path: "/profile" },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<div
			className="flex items-center justify-between bg-white py-4 px-6 shadow-md noto-sans-kr-bold"
			style={{
				marginBottom: "16px",
			}}
		>
			<div className="flex space-x-4">
				{categories.map(({ name, path }) => {
					const active = isActive(path);
					return (
						<button
							key={path}
							onClick={() => navigate(path)}
							className={`w-40 px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
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
		</div>
	);
};

export default ProfileCategory;
