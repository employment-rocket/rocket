import { React, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { api } from "../../../api/api";

const ScheduleMain = () => {
	api.get("/schedule")
		.then(function (response) {
			// 성공 핸들링
			console.log(response);
		})
		.catch(function (error) {
			// 에러 핸들링
			console.log(error);
		})
		.finally(function () {
			// 항상 실행되는 영역
		});

	// 초기 데이터
	const [items, setItems] = useState([
		{ id: "1", content: "Test 1" },
		{ id: "2", content: "Test 2" },
		{ id: "3", content: "Test 3" },
	]);

	const [items2, setItems2] = useState([
		{ id: "4", content: "Test 4" },
		{ id: "5", content: "Test 5" },
		{ id: "6", content: "Test 6" },
	]);

	// 드래그 종료 시 처리 함수
	const handleDragEnd = (result) => {
		const { source, destination } = result;

		// 드롭 대상이 없을 경우 처리
		if (!destination) return;

		// 동일한 Droppable에서 아이템 재정렬
		if (source.droppableId === destination.droppableId) {
			const itemsToUpdate =
				source.droppableId === "document" ? [...items] : [...items2];
			const [movedItem] = itemsToUpdate.splice(source.index, 1);
			itemsToUpdate.splice(destination.index, 0, movedItem);

			if (source.droppableId === "document") {
				setItems(itemsToUpdate);
			} else {
				setItems2(itemsToUpdate);
			}
		} else {
			// 다른 Droppable로 아이템 이동
			const sourceList =
				source.droppableId === "document" ? [...items] : [...items2];
			const destList =
				destination.droppableId === "document"
					? [...items]
					: [...items2];

			const [movedItem] = sourceList.splice(source.index, 1);
			destList.splice(destination.index, 0, movedItem);

			if (source.droppableId === "document") {
				setItems(sourceList);
				setItems2(destList);
			} else {
				setItems2(sourceList);
				setItems(destList);
			}
		}
	};

	return (
		<div className="flex flex-col space-y-4 h-screen w-full">
			<div>test중입니다</div>

			<div
				className=" w-full h-[65%] rounded-[20px] p-3"
				style={{ backgroundColor: "#3F83F8" }}
			>
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className="flex justify-around items-center h-full w-full">
						<Droppable droppableId="document">
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="bg-white h-[90%] w-[20%] rounded-2xl p-3 flex flex-col items-center space-y-7"
								>
									<div className="pt-6">서류 전형</div>
									{items.map((item, index) => (
										<Draggable
											key={item.id}
											index={index}
											draggableId={item.id}
										>
											{(provided) => (
												<div
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													{item.content}
												</div>
											)}
										</Draggable>
									))}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="1">
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="bg-white h-[90%] w-[20%] rounded-2xl p-3"
								>
									{items2.map((item, index) => (
										<Draggable
											key={item.id}
											index={index}
											draggableId={item.id}
										>
											{(provided) => (
												<div
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													{item.content}
												</div>
											)}
										</Draggable>
									))}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="1">
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="bg-white h-[90%] w-[20%] rounded-2xl p-3"
								>
									{items2.map((item, index) => (
										<Draggable
											key={item.id}
											index={index}
											draggableId={item.id}
										>
											{(provided) => (
												<div
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													{item.content}
												</div>
											)}
										</Draggable>
									))}
								</div>
							)}
						</Droppable>

						<Droppable droppableId="1">
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="bg-white h-[90%] w-[20%] rounded-2xl p-3"
								>
									{items2.map((item, index) => (
										<Draggable
											key={item.id}
											index={index}
											draggableId={item.id}
										>
											{(provided) => (
												<div
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													{item.content}
												</div>
											)}
										</Draggable>
									))}
								</div>
							)}
						</Droppable>
					</div>
				</DragDropContext>
			</div>
		</div>
	);
};

export default ScheduleMain;
