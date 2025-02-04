import React from "react";
import BoardItem from "./BoardItem";

const NoticeZone = () => {
	return (
		<div className="flex flex-col w-full bg-white rounded-lg border p-3  space-y-1">
			<div className="flex justify-between">
				<div>공지사항</div>
				<div>flus</div>
			</div>
			<hr />
			<div className="flex flex-col overflow-auto space-y-2 ">
				<BoardItem />
				<BoardItem />
			</div>
		</div>
	);
};

export default NoticeZone;
