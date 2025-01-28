import { useQuery } from "@tanstack/react-query";
import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { getFreeBoard, patchFreeBoard } from "../../../api/board/free-board";

const FreeBoardUpdate = () => {
	const navigate = useNavigate();
	const boardId = useParams("boardId").boardId;

	const { data, isPending } = useQuery({
		queryKey: ["freeItem"],
		queryFn: () => getFreeBoard({ boardId }),
	});

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (data) {
			reset({
				id: data.id,
				title: data.title,
				content: data.content,
			});
		}
	}, [data, reset]);

	if (isPending) return <div>Loading...</div>;

	const onSubmit = async (data) => {
		await patchFreeBoard({ boardId, data });
		navigate("/board/free");
	};

	return (
		<div className="border rounded-lg ">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="hidden" value={data.id} />
				<div className="flex flex-col gap-5 p-3 items-center ">
					{errors.title && (
						<span className="text-red-600">
							제목은 필수 입니다.
						</span>
					)}
					<input
						className="border p-2 rounded-lg w-full"
						placeholder="제목을 입력해주세요"
						{...register("title", { required: true })}
					/>

					<textarea
						rows={15}
						placeholder="내용을 입력해 주세요"
						className="border p-2 rounded-lg w-full"
						{...register("content")}
					/>
					<input
						type="submit"
						className="bg-blue-500 text-white rounded-lg w-[10%]"
						value={"작성"}
					/>
				</div>
			</form>
		</div>
	);
};

export default FreeBoardUpdate;
