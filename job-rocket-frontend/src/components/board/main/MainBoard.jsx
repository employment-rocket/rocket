import React, { useEffect } from "react";
import NoticeZone from "./NoticeZone";
import { useHeaderHeightStore } from "../../../store/headerHeightStore";

const MainBoard = () => {
	const headerHeight = useHeaderHeightStore((state) => state.headerHeight);
	console.log(headerHeight);
	return (
		<div
			className="flex flex-col bg-slate-300 border justify-center"
			style={{
				fontFamily: "CookieRegular",
				height: `calc(100dvh - ${headerHeight}px)`,
			}}
		>
			<div></div>
			<div className="grid grid-cols-2  bg-white gap-3 gap-y-5 h-full mt-32 p-5">
				<NoticeZone />
				<NoticeZone />
				<NoticeZone />
				<NoticeZone />
			</div>
		</div>
	);
};

export default MainBoard;
