import { React, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "../../../api/schedule/schedule";
import ScheduleItem from "./ScheduleItem";

const ScheduleMain = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["schedule"],
		queryFn: getSchedules,
	});

	// 초기 데이터
	const [documentItems, setDocumentItems] = useState([]);
	const [firstItems, setFirstItems] = useState([]);
	const [secondItems, setSecondItems] = useState([]);
	const [finalItems, setFinalItems] = useState([]);

	useEffect(() => {
		if (!isLoading || data) {
			setDocumentItems(data.document);
			setFirstItems(data.first);
			setSecondItems(data.second);
			setFinalItems(data.final);
		}
	}, [isLoading, data]);

	if (isLoading) return <div>Loading...</div>;

	// 드래그 종료 시 처리 함수
	const handleDragEnd = (result) => {
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

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="flex flex-col space-y-4 h-screen w-full">
			<div
				className="w-full h-[70%] rounded-[20px] p-3"
				style={{ backgroundColor: "#3F83F8" }}
			>
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className="flex justify-around items-center h-full w-full">
						{["서류전형", "1차면접", "2차면접", "최종"].map(
							(droppableId) => (
								<DroppableArea
									key={droppableId}
									droppableId={droppableId}
									items={getListByDroppableId(droppableId)}
								/>
							)
						)}
					</div>
				</DragDropContext>
			</div>
		</div>
	);
};

// Droppable 영역 컴포넌트
const DroppableArea = ({ droppableId, items }) => {
	return (
		<Droppable droppableId={droppableId}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className="bg-white h-[90%] w-[20%] rounded-2xl p-3 flex flex-col items-center space-y-7 overflow-y-auto"
				>
					<div className="pt-6 capitalize">{droppableId}</div>
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
									<ScheduleItem item={item} />
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default ScheduleMain;
