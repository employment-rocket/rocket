import React from "react";
import ScheduleMain from "./schedule/ScheduleMain";
import Calendar from "./calendar/Calendar";

const ScheduleHome = () => {
	return (
		<div className="flex w-full h-full">
			<div className="w-full">
				<ScheduleMain />
			</div>
			<div className="w-full h-full">
				<Calendar />
			</div>
		</div>
	);
};

export default ScheduleHome;
