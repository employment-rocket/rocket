import React from "react";

const ScheduleItem = ({ item }) => {
	return (
		<div className="flex flex-col w-full">
			<div>{item.title}</div>
			<div
				className="flex justify-between"
				style={{ fontSize: "0.5rem" }}
			>
				<div>{item.type}</div>
				<div>~{item.dueDate}</div>
			</div>
		</div>
	);
};

export default ScheduleItem;
