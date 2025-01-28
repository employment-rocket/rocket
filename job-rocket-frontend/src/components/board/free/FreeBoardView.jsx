import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import FreeComment from "./comment/FreeComment";
import comment from "../../../assets/comment.png";
import { deleteFreeBoard, getFreeBoard } from "../../../api/board/free-board";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

const FreeBoardView = () => {
	const boardId = useParams("boardId").boardId;
	const navigate = useNavigate();

	let isAuthor = false;

	const { data, isPending } = useQuery({
		queryKey: ["freeItem"],
		queryFn: () => getFreeBoard({ boardId }),
	});

	if (isPending) return <div>Loading...</div>;

	const token = localStorage.getItem("AccessToken");
	if (token) {
		const userInfo = jwtDecode(token);
		if (userInfo.userId === data.userId) {
			isAuthor = true;
		}
	}

	const img = `${
		import.meta.env.VITE_API_BASE_URL
	}/board/free/temp/default.png`;

	return (
		<div
			className="flex flex-col p-3 border rounded-lg space-y-3"
			style={{ fontFamily: "CookieRegular" }}
		>
			<div className="flex justify-between items-center">
				<div style={{ fontSize: "1.3rem" }}>{data.title}</div>
				<div className="flex gap-2 items-center">
					{isAuthor && (
						<>
							<div className="bg-blue-500 text-white p-2 px-6 rounded-lg">
								수정
							</div>
							<div
								className="border text-red-500 p-2 px-6 rounded-lg"
								onClick={() => {
									deleteFreeBoard({ boardId });
									navigate("/board/free");
								}}
							>
								삭제
							</div>
						</>
					)}
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center gap-1">
					{/* <img src={img} alt="" className="w-[1.5rem] h-[1.5rem]" /> */}
					{data.author}
				</div>
				<div className="text-gray-500">{data.post_date}</div>
			</div>

			<hr />
			<div className="min-h-[16rem]">{data.content}</div>
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
