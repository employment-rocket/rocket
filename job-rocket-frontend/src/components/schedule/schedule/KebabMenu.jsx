import React, { useState, useEffect, useRef } from "react";

const KebabMenu = ({
	isOpen,
	onClose,
	setUpdateModalOpen,
	setDeleteModalOpen,
}) => {
	const menuRef = useRef(null);
	useEffect(() => {
		if (!isOpen) return;

		// 2. 전역 클릭 이벤트 등록
		function handleClickOutside(e) {
			// 메뉴 영역을 클릭했는지 체크
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				// 메뉴 바깥을 클릭한 경우
				onClose(); // isOpen = false 처리
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// 3. 클린업(이벤트 해제)
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<>
			<div
				className="absolute top-0 right-0 flex  min-w-max bg-white rounded-xl shadow-lg noto-sans-kr-regular"
				ref={menuRef}
			>
				<div
					className="hover:bg-blue-200  rounded-xl  p-1"
					onClick={() => {
						onClose();
						setUpdateModalOpen(true);
					}}
				>
					수정
				</div>

				<div
					className="hover:bg-blue-200  rounded-xl  p-1"
					onClick={() => {
						onClose();
						setDeleteModalOpen(true);
					}}
				>
					삭제
				</div>
			</div>
		</>
	);
};

export default KebabMenu;
