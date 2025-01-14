import React from "react";

const FreeBoardItem = ({ item }) => {
	return (
		<div className="flex flex-col border shadow-sm shadow-gray-500 p-3 rounded-lg space-y-3">
			<div style={{ fontFamily: "CookieBold" }}>제목제목제목제목제목</div>
			<hr />
			<div>
				내용내용내용내용내용
				<br />
				내용내용내용내용내용
			</div>
			<div className="flex justify-between">
				<div>닉네임</div>
				<div>2025-01-01</div>
			</div>
		</div>
	);
};

export default FreeBoardItem;
