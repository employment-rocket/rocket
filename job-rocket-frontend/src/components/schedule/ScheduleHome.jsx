import React from "react";
import ScheduleMain from "./schedule/ScheduleMain";
import Calendar from "./calendar/Calendar";

const ScheduleHome = () => {
	return (
		<div className="flex w-full h-full justify-center space-2">
			<div className="w-[40%]">
				<ScheduleMain />
			</div>
			<div className="w-[60%] h-full">
				<Calendar />
			</div>
		</div>
	);
};

export default ScheduleHome;
