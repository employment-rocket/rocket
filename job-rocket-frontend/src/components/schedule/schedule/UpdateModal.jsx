import React, { useState } from "react";
import del from "../../../assets/delete.png";
import { updateScheduleItem } from "../../../api/schedule/schedule";
import { State_MAP } from "./const";

const UpdateModal = ({ isOpen, onClose, onCancel, data }) => {
	const id = data.id;
	const [title, setTitle] = useState(data.title);
	const [date, setDate] = useState(data.dueDate);
	const [memo, setMemo] = useState(data.memo);
	const [state, setState] = useState(State_MAP[data.state]);

	if (!isOpen) return null;

	const onSave = () => {
		updateScheduleItem({
			id: data.id,
			title: title,
			memo: memo,
			dueDate: date,
			state: state,
		});
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
						수장
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateModal;
