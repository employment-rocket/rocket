import React from "react";

const FreeComment = ({ item }) => {
	const img = `${import.meta.env.VITE_API_BASE_URL}/board/free/temp/${
		item.profile
	}`;
	return (
		<div className="flex flex-col border rounded-lg p-3 gap-2">
			<div className="flex justify-between ">
				<div className="flex items-center gap-1">
					<img src={img} alt="" className="w-[1.5rem] h-[1.5rem]" />
					{item.nickName}
				</div>
				<div className="text-gray-500">{item.postDate}</div>
			</div>
			<div>
				<hr />
			</div>
			<div>{item.content}</div>
		</div>
	);
};

export default FreeComment;
