import { React, useState, useEffect } from "react";

const BoardItem = ({ item }) => {
	const mock = {
		title: "공지) 공지입니다.",
		content: "게시판 이용 수칙입니다.",
		profile: "default.png",
		postDate: "2025-02-04",
		nickName: "관리자",
	};

	const img = `${import.meta.env.VITE_API_BASE_URL}/board/free/temp/${
		mock.profile
	}`;
	return (
		<div
			className="flex flex-col border shadow-sm shadow-gray-500 p-1
		 rounded-lg space-y-3"
		>
			<div className="line-clamp-1">{mock.title}</div>

			<hr />
			<div className="line-clamp-3 leading-6">{mock.content}</div>
			<div className="flex justify-between">
				<div className="flex items-center">
					<img className="w-[1.5rem]" src={img} />
					{mock.nickName}
				</div>
				<div className="text-gray-500">{mock.postDate}</div>
			</div>
		</div>
	);
};

export default BoardItem;
