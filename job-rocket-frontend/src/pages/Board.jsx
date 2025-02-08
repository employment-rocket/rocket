import React from "react";
import { Outlet } from "react-router";

const Board = () => {
	return (
		<div className="flex w-full justify-center m-auto">
			{/*TODO <div className="w-[10%]">
				<Aside />
			</div> */}
			<div className="w-[70%]">
				<Outlet />
			</div>
		</div>
	);
};

export default Board;
