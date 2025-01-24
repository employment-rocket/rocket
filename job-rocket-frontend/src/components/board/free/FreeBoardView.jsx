import React, { useState } from "react";
import { useParams } from "react-router";
import FreeComment from "./comment/FreeComment";
import comment from "../../../assets/comment.png";
import { getFreeBoard } from "../../../api/board/free-board";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

const FreeBoardView = () => {
	let userId;
	const token = localStorage.getItem("AccessToken");

	if (token) userId = jwtDecode(token).userId;

	const boardId = useParams("boardId").boardId;
	const { data, isLoading } = useQuery({
		queryKey: ["freeItem"],
		queryFn: getFreeBoard({ boardId }),
	});
	if (isLoading) return <div>Loading...</div>;
	const mock = {
		title: "나 취업할 수 있을까?",
		author: "청년 백수",
		content: "어림도 없지 ",
		post_date: "2025-01-20",
	};
	const img = `${
		import.meta.env.VITE_API_BASE_URL
	}/board/free/temp/default.png`;

	return (
		<div
			className="flex flex-col p-3 border rounded-lg space-y-3"
			style={{ fontFamily: "CookieRegular" }}
		>
			<div className="flex justify-between items-center">
				<div style={{ fontSize: "1.3rem" }}>{mock.title}</div>
				<div className="flex gap-2 items-center">
					{userId && (
						<>
							<div className="bg-blue-500 text-white p-2 px-6 rounded-lg">
								수정
							</div>
							<div className="border text-red-500 p-2 px-6 rounded-lg">
								삭제
							</div>
						</>
					)}
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center gap-1">
					<img src={img} alt="" className="w-[1.5rem] h-[1.5rem]" />
					{mock.author}
				</div>
				<div className="text-gray-500">{mock.post_date}</div>
			</div>

			<hr />
			<div className="min-h-[16rem]">{mock.content}</div>
			<div className="flex gap-2 items-center">
				<img
					src={comment}
					alt="댓글 아이콘"
					className="h-[32px] w-[32px]"
				/>
				<div>1</div>
			</div>
			<hr />
			<div className="flex border rounded-lg p-3 space-x-3 w-full">
				<input
					type="text"
					placeholder="댓글을 달아주세요"
					className="grow"
				/>
				<div className="bg-blue-500 text-white rounded-lg p-2 px-6">
					등록
				</div>
			</div>
			<FreeComment />
		</div>
	);
};

export default FreeBoardView;
