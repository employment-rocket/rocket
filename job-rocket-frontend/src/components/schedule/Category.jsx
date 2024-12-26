import React from "react";
import { useNavigate, useLocation } from "react-router";

const Category = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	return (
		<div className="flex space-x-14 w-full mt-3 ">
			<div
				onClick={() => navigate("/schedule")}
				style={{
					backgroundColor: isActive("/schedule")
						? "#3F83F8"
						: "transparent",
					color: isActive("/schedule") ? "#FFFFFF" : "#000000",
					border: isActive("/schedule") ? "" : "1px solid #3F83F8",
				}}
				className="p-4 cursor-pointer w-[12%] rounded-2xl flex justify-center"
			>
				<div>{"일정 관리"}</div>
			</div>
			<div
				onClick={() => navigate("/schedule/calendar")}
				style={{
					backgroundColor: isActive("/schedule/calendar")
						? "#3F83F8"
						: "transparent",
					color: isActive("/schedule/calendar")
						? "#FFFFFF"
						: "#000000",
					border: isActive("/schedule/calendar")
						? ""
						: "1px solid #3F83F8",
				}}
				className="p-4 cursor-pointer w-[12%] rounded-2xl flex justify-center"
			>
				<div>캘린더</div>
			</div>
			<div
				onClick={() => navigate("/schedule/statistics")}
				style={{
					backgroundColor: isActive("/schedule/statistics")
						? "#3F83F8"
						: "transparent",
					color: isActive("/schedule/statistics")
						? "#FFFFFF"
						: "#000000",
					border: isActive("/schedule/statistics")
						? ""
						: "1px solid #3F83F8",
				}}
				className="p-4 cursor-pointer  w-[12%] rounded-2xl flex justify-center"
			>
				<div>통계</div>
			</div>
		</div>
	);
};

export default Category;
