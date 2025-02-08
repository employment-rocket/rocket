import React from "react";
import ScheduleMain from "./schedule/ScheduleMain";
import Calendar from "./calendar/Calendar";
import { Outlet } from "react-router";

const ScheduleHome = () => {
	return (
		<div className="flex w-full h-full justify-center items-center space-2 p-4">
			<div className="flex flex-col px-2 items-center w-[40%] h-full rounded-lg border-2 border-gray-300 space-y-3">
				<div className="flex w-full items-center justify-around p-3">
					<div className="text-xl cursor-pointer">내 일정</div>

					<div className="text-xl cursor-pointer">내 통계</div>
				</div>
				<hr className="w-full border" />
				{/* <Outlet /> */}
				<ScheduleMain />
			</div>
			<div className="w-[60%] h-full">
				<Calendar />
			</div>
		</div>
	);
};

export default ScheduleHome;
