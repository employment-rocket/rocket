import { React, useState, useEffect } from "react";

const FreeBoardItem = ({ item }) => {
	const img = `${import.meta.env.VITE_API_BASE_URL}/board/free/temp/${
		item.profile
	}`;
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
				<div className="flex items-center">
					<img className="w-[1.5rem] h-[1.5rem]" src={img} />
					{item.nickName}
				</div>
				<div>{item.postDate}</div>
			</div>
		</div>
	);
};

export default FreeBoardItem;
