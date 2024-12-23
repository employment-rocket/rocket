import { React, useState } from "react";
import del from "../../../assets/delete.png";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const ScheduleItem = ({ item, droppableId, handleDelete }) => {
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

	return (
		<>
			<div className="flex flex-col w-full py-2 space-y-3">
				<div className="flex justify-between items-center">
					<div onClick={() => setUpdateModalOpen(true)}>
						{item.title}
					</div>

					<img
						src={del}
						alt="삭제"
						onClick={() => setDeleteModalOpen(true)}
						className="cursor-pointer w-[20px] h-[20px]"
					/>
				</div>
				<div
					className="flex justify-between"
					style={{ fontSize: "0.8rem" }}
				>
					<div>{item.state}</div>
					<div>~{item.dueDate}</div>
				</div>
			</div>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				handleDelete={handleDelete}
				id={item.id}
				droppableId={droppableId}
				onCancel={() => setDeleteModalOpen(false)}
			/>
			<UpdateModal
				data={item}
				isOpen={isUpdateModalOpen}
				onCancel={() => setUpdateModalOpen(false)}
			/>
		</>
	);
};

export default ScheduleItem;
