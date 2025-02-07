import React from "react";
import ScheduleMain from "./schedule/ScheduleMain";
import Calendar from "./calendar/Calendar";

const ScheduleHome = () => {
	return (
		<div className="flex w-full h-full justify-center items-center space-2 p-3">
			<div className="w-[40%] h-full">
				<ScheduleMain />
			</div>
			<div className="w-[60%] h-full">
				<Calendar />
			</div>
		</div>
	);
};

export default ScheduleHome;
