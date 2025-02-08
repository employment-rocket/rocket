import { React, useEffect, useState } from "react";
import menu from "../../../assets/menu.png";
import KebabMenu from "./KebabMenu";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

const ScheduleItem = ({ item, droppableId, handleDelete }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	return (
		<>
			<div className="flex flex-col w-full py-2 space-y-3">
				<div className="flex justify-between items-center ">
					<div className="overflow-hidden text-ellipsis whitespace-nowrap ">
						{item.title}
					</div>
					<div className="relative">
						<img
							src={menu}
							alt="메뉴"
							onClick={() => setIsOpen(true)}
							className="cursor-pointer max-h-[20px]"
						/>
						{isOpen && (
							<KebabMenu
								isOpen={isOpen}
								onClose={() => setIsOpen(false)}
								setUpdateModalOpen={setUpdateModalOpen}
								setDeleteModalOpen={setDeleteModalOpen}
							/>
						)}
					</div>
				</div>
				<div
					className="flex justify-between"
					style={{ fontSize: "0.8rem" }}
				>
					<div>{item.state}</div>
					<div>~{item.dueDate}</div>
				</div>
			</div>
			<UpdateModal
				data={item}
				isOpen={isUpdateModalOpen}
				onCancel={() => setUpdateModalOpen(false)}
			/>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				handleDelete={handleDelete}
				id={item.id}
				droppableId={droppableId}
				onCancel={() => setDeleteModalOpen(false)}
			/>
		</>
	);
};

export default ScheduleItem;
