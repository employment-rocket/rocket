import React from "react";

const FreeComment = ({ item }) => {
	const img = `${
		import.meta.env.VITE_API_BASE_URL
	}/board/free/temp/default.png`;
	return (
		<div className="flex flex-col border rounded-lg p-3 gap-2">
			<div className="flex justify-between ">
				<div className="flex items-center gap-1">
					<img src={img} alt="" className="w-[1.5rem] h-[1.5rem]" />
					{"노년백수"}
				</div>
				<div className="text-gray-500">2025-01-23</div>
			</div>
			<div>
				<hr />
			</div>
			<div>날씨가 추우니 다음에 가죠</div>
		</div>
	);
};

export default FreeComment;
