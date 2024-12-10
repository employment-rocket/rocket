import React from "react";
import Category from "../components/schedule/Category";
import { Outlet } from "react-router";

const Schedule = () => {
	return (
		<div
			className="flex flex-col w-full h-full p-5 space-y-9"
			style={{ fontFamily: "CookieBold" }}
		>
			<div className="">
				<Category />
			</div>
			<Outlet />
		</div>
	);
};

export default Schedule;
