import React, { useState } from "react";
import del from "../../../assets/delete.png";
import { createScheduleItem } from "../../../api/schedule/schedule";
import { useQueryClient } from "@tanstack/react-query";

const CreateModal = ({ isOpen, onClose, onCancel, type }) => {
	const queryClient = useQueryClient();

	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [memo, setMemo] = useState("");
	const [state, setState] = useState("진행중");

	const [error, setError] = useState({
		title: "",
		date: "",
	});

	console.log(type);
	if (!isOpen) return null;

	const resetForm = () => {
		setTitle("");
		setDate("");
		setMemo("");
		setState("진행중");
		setError({ title: "", date: "" });
	};

	const onSave = async () => {
		let hasError = false;
		const newError = { title: "", date: "" };

		if (!title.trim()) {
			newError.title = "제목은 필수입니다.";
			hasError = true;
		}
		if (!date) {
			newError.date = "마감일은 필수입니다.";
			hasError = true;
		}
		setError(newError);

		if (hasError) {
			return;
		}

		await createScheduleItem({ title, dueDate: date, memo, state, type });
		queryClient.invalidateQueries(["schedule"]);

		resetForm();
		onCancel();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg border-2 border-blue-300 shadow-lg w-[600px] space-y-3">
				<div className="flex justify-between items-center">
					<div>제목</div>
					<img
						src={del}
						alt="닫기버튼"
						onClick={onCancel}
						className="cursor-pointer"
					/>
				</div>

				<input
					type="text"
					className="border border-blue-300 rounded-lg w-full p-1 noto-sans-kr-regular"
					placeholder="제목을 입력하세요"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				{error.title && (
					<div className="text-red-500 text-sm">{error.title}</div>
				)}

				<div>마감일</div>
				<input
					type="date"
					className="border border-blue-300 rounded-lg w-full p-1 noto-sans-kr-regular"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>

				{error.date && (
					<div className="text-red-500 text-sm">{error.date}</div>
				)}

				<div>메모</div>
				<textarea
					className="border border-blue-300 rounded-lg w-full p-1 noto-sans-kr-regular"
					placeholder="메모를 입력하세요"
					rows={10}
					value={memo}
					onChange={(e) => setMemo(e.target.value)}
				/>

				<select
					className="border border-blue-300 rounded-lg"
					value={state}
					onChange={(e) => setState(e.target.value)}
				>
					<option value="진행중">진행중</option>
					<option value="탈락">탈락</option>
					<option value="최종합격">최종합격</option>
				</select>

				<div className="flex justify-around mt-2 w-full">
					<button
						className="py-2 bg-blue-500 text-white rounded-lg w-full"
						onClick={onSave}
					>
						저장
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateModal;
