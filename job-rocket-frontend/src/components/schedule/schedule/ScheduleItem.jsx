import { React, useState } from "react";
import del from "../../../assets/delete.png";
import DeleteModal from "./DeleteModal";

const ScheduleItem = ({ item, droppableId, handleDelete }) => {
	const [isModalOpen, setModalOpen] = useState(false);

	return (
		<>
			<div className="flex flex-col w-full py-2 space-y-3">
				<div className="flex justify-between items-center">
					<div>{item.title}</div>

					<img
						src={del}
						alt="삭제"
						onClick={() => setModalOpen(true)}
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
			<DeleteModal
				isOpen={isModalOpen}
				handleDelete={handleDelete}
				id={item.id}
				droppableId={droppableId}
				onCancel={() => setModalOpen(false)}
			/>
		</>
	);
};

export default ScheduleItem;
