import React from "react";
import Aside from "../components/board/Aside";
import { Outlet } from "react-router";

const Board = () => {
	return (
		<div className="flex p-10 space-x-10 w-full ">
			<div className="w-[10%]">
				<Aside />
			</div>
			<div className="grow w-[85%]">
				<Outlet />
			</div>
		</div>
	);
};

export default Board;
