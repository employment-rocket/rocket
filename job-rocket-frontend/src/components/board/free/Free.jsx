import React from "react";
import FreeBoardItem from "./FreeBoardItem";

const Free = () => {
	return (
		<div
			className="flex flex-col space-y-3 h-[80vh]"
			style={{ fontFamily: "CookieRegular" }}
		>
			<div className="flex justify-between">
				<div>
					<input
						type="text"
						placeholder="검색 하기"
						className="w-full p-2 px-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
					/>
				</div>
				<button className="p-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
					글쓰기
				</button>
			</div>
			<div className="h-full border bottom-3 rounded-lg p-3  overflow-y-auto scrollbar-hide">
				<div className="grid grid-cols-2 gap-10">
					<FreeBoardItem />
					<FreeBoardItem />
					<FreeBoardItem />
					<FreeBoardItem />
					<FreeBoardItem />
					<FreeBoardItem />
					<FreeBoardItem />
					<FreeBoardItem />
					<FreeBoardItem />
				</div>
			</div>
		</div>
	);
};

export default Free;
