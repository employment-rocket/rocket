import React, { useState } from "react";
import del from "../../../assets/delete.png";
import { createScheduleItem } from "../../../api/schedule/schedule";

const CreateModal = ({ isOpen, onClose, onCancel }) => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [memo, setMemo] = useState("");
	const [state, setState] = useState("Ongoing");

	if (!isOpen) return null;

	const resetForm = () => {
		setTitle("");
		setDate("");
		setMemo("");
		setState("진행중"); // 초기값을 진행중으로
	};

	const onSave = () => {
		// 저장 로직 (title, date, memo, state 사용)
		console.log("제목:", title);
		console.log("마감일:", date);
		console.log("메모:", memo);
		console.log("상태:", state);
		createScheduleItem({ title, dueDate: date, memo, state });
		resetForm();
		onCancel();
	};

	return (
		<div
			className="fixed inset-0 flex items-center justify-center z-50"
			style={{ fontFamily: "CookieBold" }}
		>
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
					className="border border-blue-300 rounded-lg w-full p-1"
					style={{ fontFamily: "CookieRegular" }}
					placeholder="제목을 입력하세요"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<div>마감일</div>
				<input
					type="date"
					className="border border-blue-300 rounded-lg w-full p-1"
					style={{ fontFamily: "CookieRegular" }}
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>

				<div>메모</div>
				<textarea
					className="border border-blue-300 rounded-lg w-full p-1"
					style={{ fontFamily: "CookieRegular" }}
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
					<option value="Ongoing">진행중</option>
					<option value="Fail">탈락</option>
					<option value="Passed">최종합격</option>
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
