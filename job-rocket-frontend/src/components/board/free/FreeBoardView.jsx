import React from "react";
import { useParams } from "react-router";

const FreeBoardView = () => {
	const mock = {
		title: "나 취업할 수 있을까?",
		author: "청년 백수",
		content: "어림도 없지 ",
		post_date: "2025-01-20",
	};

	const boardId = useParams("boardId");

	return (
		<div className="flex flex-col p-3 border rounded-lg space-y-3">
			<div className="flex justify-between">
				<div>{mock.title}</div>
				<div className="flex">
					<div>수정</div>
					<div>삭제</div>
				</div>
			</div>
			<div className="flex justify-between">
				<div>{mock.author}</div>
				<div>{mock.post_date}</div>
			</div>
			<hr />
			<div className="min-h-[16rem]">{mock.content}</div>
			<hr />
			<div className="flex border rounded-lg p-3 space-x-3 w-full">
				<input
					type="text"
					placeholder="댓글을 달아주세요"
					className="grow"
				/>
				<div>등록</div>
			</div>
		</div>
	);
};

export default FreeBoardView;
