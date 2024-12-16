import React from "react";
import del from "../../../assets/delete.png";

const ScheduleItem = ({ item, droppableId, handleDelete }) => {
	return (
		<div className="flex flex-col w-full py-2 space-y-3">
			<div className="flex justify-between items-center">
				<div>{item.title}</div>

				<img
					src={del}
					alt="삭제"
					onClick={() => handleDelete(item.id, droppableId)}
					className="cursor-pointer"
				/>
			</div>
			<div
				className="flex justify-between"
				style={{ fontSize: "0.8rem" }}
			>
				<div>{item.type}</div>
				<div>~{item.dueDate}</div>
			</div>
		</div>
	);
};

export default ScheduleItem;
