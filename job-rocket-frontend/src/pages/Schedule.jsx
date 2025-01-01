import React from "react";
import Category from "../components/schedule/Category";
import { Outlet } from "react-router";

const Schedule = () => {
	return (
		<div
			className="flex flex-col w-full h-full"
			style={{ fontFamily: "CookieBold" }}
		>
			<Category />

			<Outlet />
		</div>
	);
};

export default Schedule;
