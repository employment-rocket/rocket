import React, { useEffect } from "react";
import BoardZone from "./BoardZone";
import { useHeaderHeightStore } from "../../../store/headerHeightStore";

const MainBoard = () => {
	const headerHeight = useHeaderHeightStore((state) => state.headerHeight);
	const TYPE = {
		NOTICE: "notice",
		FREE: "free",
		QA: "qa",
		REVIEW: "review",
	};

	return (
		<div
			className="flex flex-col bg-slate-300 border justify-center"
			style={{
				height: `calc(100dvh - ${headerHeight}px)`,
			}}
		>
			<div></div>
			<div className="grid grid-cols-2  bg-white gap-3 gap-y-5 h-full mt-32 p-5">
				<BoardZone type={TYPE.NOTICE} />
				<BoardZone type={TYPE.FREE} />
				<BoardZone type={TYPE.QA} />
				<BoardZone type={TYPE.REVIEW} />
			</div>
		</div>
	);
};

export default MainBoard;
