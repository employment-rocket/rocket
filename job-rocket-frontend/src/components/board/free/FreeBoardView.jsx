import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
	createFreeComment,
	deleteFreeBoard,
	getFreeBoard,
} from "../../../api/board/free-board";
import commentPng from "../../../assets/comment.png";
import { isAuthor } from "../Common";
import FreeCommentList from "./comment/FreeCommentList";

const FreeBoardView = () => {
	const [comment, setComment] = useState("");
	const queryClient = useQueryClient();
	const boardId = useParams("boardId").boardId;
	const navigate = useNavigate();

	const { data, isPending } = useQuery({
		queryKey: ["freeItem"],
		queryFn: () => getFreeBoard({ boardId }),
	});

	if (isPending) return <div>Loading...</div>;
	if (data === 404) navigate("/board/free");
	const token = localStorage.getItem("AccessToken");
	let author = isAuthor(data.userId);

	const handleCreateComment = async () => {
		if (!comment) alert("댓글을 입력해주세요");
		try {
			await createFreeComment({ boardId, content: comment });
			// 등록 성공하면 댓글 리스트 다시 가져오기
			queryClient.invalidateQueries(["freeCommentList"]);
			setComment(""); // 인풋 초기화
		} catch (error) {
			console.error(error);
		}
	};

	const img = `${
		import.meta.env.VITE_API_BASE_URL
	}/board/free/temp/default.png`;

	return (
		<div
			className="flex flex-col p-3 border rounded-lg space-y-3 mt-3"
			style={{ fontFamily: "CookieRegular" }}
		>
			<div className="flex justify-between items-center">
				<div style={{ fontSize: "1.3rem" }}>{data.title}</div>
				<div className="flex gap-2 items-center">
					{author && (
						<>
							<div
								className="bg-blue-500 text-white p-2 px-6 rounded-lg cursor-pointer"
								onClick={() =>
									navigate(`/board/free/form/${boardId}`)
								}
							>
								수정
							</div>
							<div
								className="border text-red-500 p-2 px-6 rounded-lg cursor-pointer"
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
					src={commentPng}
					alt="댓글 아이콘"
					className="h-[32px] w-[32px]"
				/>
				<div>1</div>
			</div>
			<hr />
			<div className="flex border rounded-lg p-3 space-x-3 w-full">
				<input
					type="text"
					placeholder={
						token ? "댓글을 달아주세요." : "로그인이 필요합니다."
					}
					className="grow"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					disabled={!token}
				/>
				<div
					className="bg-blue-500 text-white rounded-lg p-2 px-6"
					onClick={handleCreateComment}
				>
					등록
				</div>
			</div>
			<FreeCommentList boardId={boardId} />
		</div>
	);
};

export default FreeBoardView;
