import React from "react";
import { useForm } from "react-hook-form";
import { createFreeBoard } from "../../../api/board/free-board";
import { useNavigate } from "react-router";

const FreeBoardForm = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		await createFreeBoard(data.title, data.content);
		navigate("/board/free");
	};

	return (
		<div className="border rounded-lg h-full">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-5 p-3 items-center h-full">
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
						cols={60}
						rows={20}
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

export default FreeBoardForm;
