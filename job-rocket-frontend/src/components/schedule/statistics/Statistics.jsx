import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
	labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	],
};

const Statistics = () => {
	return (
		<div
			className="flex flex-col w-full h-screen items-center p-3 space-y-5"
			style={{ fontFamily: "CookieRegular" }}
		>
			<div>통계화면입니다.</div>
			<div className="flex flex-col bg-blue-300 w-1/2 items-center rounded-lg space-x-5 p-3">
				<div className="flex justify-around w-full">
					<div className="flex flex-col items-center space-y-4">
						<div>지원횟수</div>
						<div>5</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>서류전형</div>
						<div>5</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>1차면접</div>
						<div>5</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>2차면접</div>
						<div>5</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>최종</div>
						<div>5</div>
					</div>
				</div>

				<div className="flex justify-around w-full">
					<div className="flex flex-col items-center space-y-4">
						<div>최종합격</div>
						<div>5</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>탈락</div>
						<div>5</div>
					</div>
				</div>
			</div>
			<div className="flex space-x-5">
				<div>
					<Pie data={data} />
				</div>
				<div>
					<Pie data={data} />
				</div>
			</div>
		</div>
	);
};

export default Statistics;
