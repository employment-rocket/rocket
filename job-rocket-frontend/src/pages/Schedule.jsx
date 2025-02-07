import React from "react";
import Category from "../components/schedule/Category";
import { Outlet } from "react-router";
import { useHeaderHeightStore } from "../store/headerHeightStore";

const Schedule = () => {
	const headerHeight = useHeaderHeightStore((state) => state.headerHeight);
	return (
		<div
			className="flex flex-col w-full h-screen"
			style={{
				fontFamily: "CookieBold",
				height: `calc(100dvh - ${headerHeight}px)`,
			}}
		>
			<Category />

			<Outlet />
		</div>
	);
};

export default Schedule;
