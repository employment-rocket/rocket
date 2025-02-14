import React from "react";
import del from "../../../assets/delete.png";

const InfoModal = ({ isOpen, onCancel, data }) => {
	const title = data.title;
	const date = data.startStr;
	const memo = data.extendedProps.memo;
	const state = data.extendedProps.description;

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 noto-sans-kr-bold">
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
					readOnly
				/>

				<div>마감일</div>
				<input
					type="date"
					className="border border-blue-300 rounded-lg w-full p-1 noto-sans-kr-regular"
					value={date}
					readOnly
				/>

				<div>메모</div>
				<textarea
					className="border border-blue-300 rounded-lg w-full p-1 noto-sans-kr-regular"
					placeholder="메모를 입력하세요"
					rows={10}
					value={memo}
					readOnly
				/>

				<select
					className="border border-blue-300 rounded-lg"
					value={state}
					readOnly
				>
					<option value="Ongoing">진행중</option>
					<option value="Fail">탈락</option>
					<option value="Passed">최종합격</option>
				</select>
			</div>
		</div>
	);
};

export default InfoModal;
