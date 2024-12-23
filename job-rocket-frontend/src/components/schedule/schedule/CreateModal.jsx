import React, { useState } from "react";
import del from "../../../assets/delete.png";

const CreateModal = ({ isOpen, onClose, onCancel }) => {
	// 상태 정의
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [memo, setMemo] = useState("");
	const [state, setState] = useState("작성중");

	if (!isOpen) return null;

	const onSave = () => {
		// 저장 로직 (title, date, memo, state 사용)
		console.log("제목:", title);
		console.log("마감일:", date);
		console.log("메모:", memo);
		console.log("상태:", state);
		onCancel();
	};

	return (
		<div
			className="fixed inset-0 flex items-center justify-center z-50"
			style={{ fontFamily: "CookieBold" }}
		>
			<div className="bg-white p-6 rounded-lg border-2 border-blue-300 shadow-lg w-[600px] space-y-3">
				{/* 상단 영역 */}
				<div className="flex justify-between items-center">
					<div>제목</div>
					<img
						src={del}
						alt="닫기버튼"
						onClick={onCancel}
						className="cursor-pointer"
					/>
				</div>

				{/* 제목 입력 */}
				<input
					type="text"
					className="border border-blue-300 rounded-lg w-full p-1"
					style={{ fontFamily: "CookieRegular" }}
					placeholder="제목을 입력하세요"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				{/* 마감일 */}
				<div>마감일</div>
				<input
					type="date"
					className="border border-blue-300 rounded-lg w-full p-1"
					style={{ fontFamily: "CookieRegular" }}
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>

				{/* 메모 */}
				<div>메모</div>
				<textarea
					className="border border-blue-300 rounded-lg w-full p-1"
					style={{ fontFamily: "CookieRegular" }}
					placeholder="메모를 입력하세요"
					rows={10}
					value={memo}
					onChange={(e) => setMemo(e.target.value)}
				/>

				{/* 상태 */}
				<select
					className="border border-blue-300 rounded-lg"
					value={state}
					onChange={(e) => setState(e.target.value)}
				>
					<option value="작성중">작성중</option>
					<option value="작성완료">작성완료</option>
				</select>

				{/* 버튼 영역 */}
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
