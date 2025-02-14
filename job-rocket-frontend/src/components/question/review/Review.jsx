import React from "react";

const Review = ({ text, onSelect, onDelete }) => {
	return (
		<div
			className="p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 flex items-center justify-between"
			onClick={onSelect}
		>
			<span className="text-sm text-gray-700">{text}</span>
			<button
				className="text-red-500 font-bold px-2"
				onClick={(e) => {
					e.stopPropagation();
					onDelete();
				}}
			>
				✖
			</button>
		</div>
	);
};

export default Review;
