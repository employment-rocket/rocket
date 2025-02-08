import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Calendar from "../components/schedule/calendar/Calendar";
import { useHeaderHeightStore } from "../store/headerHeightStore";

const Schedule = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const headerHeight = useHeaderHeightStore((state) => state.headerHeight);
	const isActive = location.pathname === "/schedule";

	return (
		<div
			className="flex flex-col w-full h-screen"
			style={{
				fontFamily: "CookieBold",
				height: `calc(100dvh - ${headerHeight}px)`,
			}}
		>
			<div className="flex w-full h-full justify-center items-center space-2 p-4">
				<div className="flex flex-col px-2 items-center w-[40%] h-full rounded-lg border-2 border-gray-300 ">
					<div className="flex w-full items-center justify-around p-3">
						<div
							className={`w-full text-xl cursor-pointer text-center ${
								isActive ? "text-black" : "text-gray-300"
							}`}
							onClick={() => navigate("/schedule")}
						>
							내 일정
						</div>
						<div className="w-1 h-full bg-gray-300"></div>
						<div
							className={`w-full text-xl cursor-pointer text-center ${
								isActive ? "text-gray-300" : "text-black"
							}`}
							onClick={() => navigate("/schedule/statistics")}
							style={{ text: `${isActive} ? gray : blue` }}
						>
							내 통계
						</div>
					</div>
					<hr className="w-full border" />
					{/* <Outlet /> */}
					<Outlet />
				</div>
				<div className="w-[60%] h-full">
					<Calendar />
				</div>
			</div>
			);
		</div>
	);
};

export default Schedule;
