import React from "react";

const DeleteModal = ({
	isOpen,
	onClose,
	handleDelete,
	id,
	droppableId,
	onCancel,
}) => {
	if (!isOpen) return null;
	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
			style={{ fontFamily: "CookieRegular" }}
		>
			<div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
				<div>삭제하시겠습니까??</div>

				<hr />

				<div className="flex justify-around mt-2 w-full">
					<button
						className="mx-2 px-5 py-2 bg-red-500 text-white rounded-lg w-full"
						onClick={() => handleDelete(id, droppableId)}
					>
						삭제
					</button>
					<button
						className="mx-2 px-5 py-2 bg-gray-300 text-black rounded-lg w-full"
						onClick={onCancel} // 모달 닫기
					>
						취소
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
