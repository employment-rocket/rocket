import React from "react";

const FreeBoardItem = ({ item }) => {
	return (
		<div className="flex flex-col border shadow-sm shadow-gray-500 p-3 rounded-lg space-y-3">
			<div className="line-clamp-1" style={{ fontFamily: "CookieBold" }}>
				{item.title}
			</div>
			<hr />
			<div className="line-clamp-3 min-h-[4.5rem] leading-6">
				{item.content}
			</div>
			<div className="flex justify-between">
				<div>{item.nickName}</div>
				<div>{item.postDate}</div>
			</div>
		</div>
	);
};

export default FreeBoardItem;
