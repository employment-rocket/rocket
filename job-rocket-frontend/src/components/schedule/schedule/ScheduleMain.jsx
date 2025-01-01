import { React, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import addIcon from "../../../assets/icon-add.png";
import {
	deleteScheduleItem,
	getSchedules,
	modifyScheduleItem,
} from "../../../api/schedule/schedule";
import ScheduleItem from "./ScheduleItem";
import CreateModal from "./CreateModal";
import { TYPE_MAP } from "./const";

const typeList = Object.keys(TYPE_MAP);

export default function ScheduleMain() {
	const { data, isLoading } = useQuery({
		queryKey: ["schedule"],
		queryFn: getSchedules,
	});

	const [isModalOpen, setModalOpen] = useState(false);

	const [documentItems, setDocumentItems] = useState([]);
	const [firstItems, setFirstItems] = useState([]);
	const [secondItems, setSecondItems] = useState([]);
	const [finalItems, setFinalItems] = useState([]);

	useEffect(() => {
		if (!isLoading && data) {
			setDocumentItems(data.Document || []);
			setFirstItems(data.First || []);
			setSecondItems(data.Second || []);
			setFinalItems(data.Final || []);
		}
	}, [isLoading, data]);

	if (isLoading) return <div>Loading...</div>;

	async function handleDragEnd(result) {
		const { source, destination } = result;
		if (!destination) return;

		const sourceList = getListByDroppableId(source.droppableId);
		const destList = getListByDroppableId(destination.droppableId);

		const [movedItem] = sourceList.splice(source.index, 1);
		destList.splice(destination.index, 0, movedItem);

		updateListState(source.droppableId, sourceList);
		updateListState(destination.droppableId, destList);

		try {
			const serverType = TYPE_MAP[destination.droppableId];
			await modifyScheduleItem({ id: movedItem.id, type: serverType });

			console.log("수정 성공");
		} catch (error) {
			console.error("수정 실패", error);
		}
	}

	function getListByDroppableId(droppableId) {
		switch (droppableId) {
			case "서류전형":
				return documentItems;
			case "1차면접":
				return firstItems;
			case "2차면접":
				return secondItems;
			case "최종":
				return finalItems;
			default:
				return [];
		}
	}

	function updateListState(droppableId, newList) {
		newList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
		switch (droppableId) {
			case "서류전형":
				setDocumentItems(newList);
				break;
			case "1차면접":
				setFirstItems(newList);
				break;
			case "2차면접":
				setSecondItems(newList);
				break;
			case "최종":
				setFinalItems(newList);
				break;
			default:
				break;
		}
	}

	function handleDelete(id, droppableId) {
		deleteScheduleItem({ id });
		const list = getListByDroppableId(droppableId);
		const updatedList = list.filter((item) => item.id !== id);
		updateListState(droppableId, updatedList);
	}

	return (
		<>
			<div className="flex flex-col space-y-4 h-screen w-full p-4">
				<div className="w-full h-[70%] rounded-[20px] p-3 border-2 border-blue-300 bg-gray-300">
					<DragDropContext onDragEnd={handleDragEnd}>
						<div className="flex justify-around items-center h-full w-full">
							{typeList.map((droppableId) => (
								<DroppableArea
									key={droppableId}
									droppableId={droppableId}
									items={getListByDroppableId(droppableId)}
									handleDelete={handleDelete}
									setModalOpen={setModalOpen}
								/>
							))}
						</div>
					</DragDropContext>
				</div>
			</div>

			<CreateModal
				isOpen={isModalOpen}
				onCancel={() => setModalOpen(false)}
			/>
		</>
	);
}

// ----------------------------------------------------------------
// DroppableArea: "서류전형"만 추가 버튼 노출
// ----------------------------------------------------------------
function DroppableArea({ droppableId, items, handleDelete, setModalOpen }) {
	const showAddButton = droppableId === "서류전형";

	return (
		<div className="bg-white h-[90%] w-[20%] flex flex-col items-center space-y-2 rounded-2xl border-2 border-blue-500">
			<div className="pt-6 px-3 capitalize flex w-full  border-b-2 pb-2">
				<div className="w-[20px] h-[20px]" />

				<div className="grow flex justify-center items-center">
					<div>{droppableId}</div>
				</div>

				{showAddButton && (
					<img
						src={addIcon}
						alt="추가 버튼"
						className="w-[20px] h-[20px] self-center cursor-pointer"
						onClick={() => setModalOpen(true)}
					/>
				)}
			</div>

			<Droppable droppableId={droppableId}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="h-full w-full p-3 flex flex-col items-center space-y-7 overflow-y-auto scrollbar-hide "
					>
						{items.map((item, index) => (
							<Draggable
								key={item.id.toString()}
								draggableId={item.id.toString()}
								index={index}
							>
								{(provided) => (
									<div
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
										className="p-2 rounded-md w-full bg-blue-300"
									>
										<ScheduleItem
											item={item}
											droppableId={droppableId}
											handleDelete={handleDelete}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}
