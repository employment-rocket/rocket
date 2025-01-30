import React from "react";
import { isAuthor } from "../../Common";

const FreeComment = ({ item }) => {
	const author = isAuthor(item.userId);
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
			<div className="flex justify-between">
				<div>{item.content}</div>
				{author && (
					<div className="border text-red-500 p-2 px-6 rounded-lg cursor-pointer">
						{"삭제"}
					</div>
				)}
			</div>
		</div>
	);
};

export default FreeComment;
