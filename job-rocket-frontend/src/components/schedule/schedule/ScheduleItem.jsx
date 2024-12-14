import React from "react";

const ScheduleItem = ({ id, title, memo, dueDate, type }) => {
	return (
		<div className="flex">
			<div>{title}</div>
			<div>{dueDate}</div>
			<div>{type}</div>
		</div>
	);
};

export default ScheduleItem;
