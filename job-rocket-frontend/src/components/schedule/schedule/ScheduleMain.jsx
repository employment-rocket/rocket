import { React, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import addIcon from "../../../assets/icon-add.png";
import {
	getSchedules,
	modifyScheduleItem,
} from "../../../api/schedule/schedule";
import ScheduleItem from "./ScheduleItem";
import CreateModal from "./CreateModal";

const ScheduleMain = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["schedule"],
		queryFn: getSchedules,
	});
	const typeList = ["서류전형", "1차면접", "2차면접", "최종"];
	const [isModalOpen, setModalOpen] = useState(false);

	// 초기 데이터
	const [documentItems, setDocumentItems] = useState([]);
	const [firstItems, setFirstItems] = useState([]);
	const [secondItems, setSecondItems] = useState([]);
	const [finalItems, setFinalItems] = useState([]);

	useEffect(() => {
		if (!isLoading || data) {
			setDocumentItems(data.Document);
			setFirstItems(data.First);
			setSecondItems(data.Second);
			setFinalItems(data.Final);
		}
	}, [isLoading, data]);

	if (isLoading) return <div>Loading...</div>;

	// 드래그 종료 시 처리 함수
	const handleDragEnd = async (result) => {
		const { source, destination } = result;

		// 드롭 대상이 없을 경우 처리
		if (!destination) return;

		const sourceList = getListByDroppableId(source.droppableId);
		const destList = getListByDroppableId(destination.droppableId);

		// 아이템 이동 처리
		const [movedItem] = sourceList.splice(source.index, 1);
		destList.splice(destination.index, 0, movedItem);

		// 상태 업데이트
		updateListState(source.droppableId, sourceList);
		updateListState(destination.droppableId, destList);

		try {
			await modifyScheduleItem({
				id: movedItem.id,
				type: type(destination.droppableId),
			});
		} catch (error) {
			console.error("수정 실패", error);
			// 롤백 or 오류 처리
		}
	};

	const type = (droppableId) => {
		switch (droppableId) {
			case "서류전형":
				return "Document";
			case "1차면접":
				return "First";
			case "2차면접":
				return "Second";
			case "최종":
				return "Final";
			default:
				return "error";
		}
	};
	// Droppable ID에 따라 리스트 가져오기
	const getListByDroppableId = (droppableId) => {
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
	};

	// Droppable ID에 따라 상태 업데이트
	const updateListState = (droppableId, newList) => {
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
	};

	const handleDelete = (id, droppableId) => {
		console.log("id = ", id, " droppableId = ", id);
		const list = getListByDroppableId(droppableId);
		const updatedList = list.filter((item) => item.id !== id);
		updateListState(droppableId, updatedList);
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<div className="flex flex-col space-y-4 h-screen w-full">
				<div
					className="w-full h-[70%] rounded-[20px] p-3"
					style={{ backgroundColor: "#3F83F8" }}
				>
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
};

// Droppable 영역 컴포넌트
const DroppableArea = ({ droppableId, items, handleDelete, setModalOpen }) => {
	if (droppableId === "서류전형") {
		return (
			<div className="bg-white h-[90%] w-[20%] flex flex-col items-center space-y-2 rounded-2xl ">
				<div className="pt-6 px-3 capitalize flex w-full ">
					<div className="w-[20px] h-[20px]"></div>
					<div className="grow flex justify-center items-center">
						<div>{droppableId}</div>
					</div>
					<img
						src={addIcon}
						alt="추가 버튼"
						className="w-[20px] h-[20px] self-center"
						onClick={() => setModalOpen(true)}
					/>
				</div>
				<Droppable droppableId={droppableId}>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className=" h-full w-full  p-3 flex flex-col items-center space-y-7 overflow-y-auto scrollbar-hide"
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
	} else {
		return (
			<div className="bg-white h-[90%] w-[20%] flex flex-col items-center space-y-2 rounded-2xl ">
				<div className="pt-6 px-3 capitalize">{droppableId}</div>
				<Droppable droppableId={droppableId}>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className=" h-full w-full  p-3 flex flex-col items-center space-y-7 overflow-y-auto scrollbar-hide"
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
};
export default ScheduleMain;
