import React from "react";
import FreeBoardItem from "./FreeBoardItem";
import { useQuery } from "@tanstack/react-query";
import { getFreeBoardList } from "../../../api/board/free-board";
import { useNavigate } from "react-router";
import { useHeaderHeightStore } from "../../../store/headerHeightStore";

const Free = () => {
	const headerHeight = useHeaderHeightStore((state) => state.headerHeight);
	const navigate = useNavigate();
	const { data, isLoading } = useQuery({
		queryKey: ["free"],
		queryFn: getFreeBoardList,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div
			className="flex flex-col space-y-3 p-3"
			style={{
				fontFamily: "CookieRegular",
				height: `calc(100dvh - ${headerHeight}px)`,
			}}
		>
			<div className="flex justify-between">
				<div>
					<input
						type="text"
						placeholder="검색 하기"
						className="w-full p-2 px-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
					/>
				</div>
				<button
					className="p-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
					onClick={() => navigate("/board/free/form")}
				>
					글쓰기
				</button>
			</div>
			<div className="h-full border bottom-3 rounded-lg p-3  overflow-y-auto scrollbar-hide">
				<div className="grid grid-cols-2 gap-10">
					{data.map((item) => (
						<div
							className="cursor-pointer"
							key={item.id}
							onClick={() => navigate(`/board/free/${item.id}`)}
						>
							<FreeBoardItem item={item} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Free;
