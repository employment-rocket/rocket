import React from "react";
import BoardItem from "./BoardItem";
import { useNavigate } from "react-router";

const BoardZone = ({ type }) => {
	console.log(type);
	const itemList = ["item1", "item2"];
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full bg-white rounded-lg border p-3  space-y-1">
			<div className="flex justify-between">
				<div>공지사항</div>
				<div
					className="cursor-pointer"
					onClick={() => navigate(`/board/${type}`)}
				>
					+
				</div>
			</div>
			<hr />
			<div className="flex flex-col overflow-auto space-y-2 h-[20vdh]">
				{itemList.map((item, idx) => (
					<BoardItem item={item} key={idx} />
				))}
			</div>
		</div>
	);
};

export default BoardZone;
