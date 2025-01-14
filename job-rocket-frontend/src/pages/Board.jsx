import React from "react";
import Aside from "../components/board/Aside";
import { Outlet } from "react-router";

const Board = () => {
	return (
		<div className="flex p-10 space-x-10 ">
			<Aside />
			<div className="grow">
				<Outlet />
			</div>
		</div>
	);
};

export default Board;
