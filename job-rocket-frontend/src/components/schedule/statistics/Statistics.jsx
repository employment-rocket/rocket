import React, { useEffect, useMemo, useState } from "react";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	LinearScale,
	CategoryScale,
	BarElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getStatisticsSchedule } from "../../../api/schedule/schedule";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);

const Statistics = () => {
	const [document, setDocument] = useState(0);
	const [first, setFirst] = useState(0);
	const [second, setSecond] = useState(0);
	const [final, setFinal] = useState(0);
	const [ongoing, setOngoing] = useState(0);
	const [fail, setFail] = useState(0);
	const [passed, setPassed] = useState(0);
	const [documentFail, setDocumentFail] = useState(0);

	const { data, isLoading } = useQuery({
		queryKey: ["statistics"],
		queryFn: getStatisticsSchedule,
	});

	useEffect(() => {
		console.log(data);
		if (data) {
			setDocument(data.DOCUMENT || 0);
			setFirst(data.FIRST || 0);
			setSecond(data.SECOND || 0);
			setFinal(data.FINAL || 0);
			setOngoing(data.ONGOING || 0);
			setFail(data.FAIL || 0);
			setPassed(data.PASSED || 0);
			setDocumentFail(data.DocumentFail || 0);
		}
	}, [data]);

	const totalApplications = useMemo(
		() => document + first + second + final,
		[document, first, second, final]
	);

	// 퍼센트 계산
	const getPercentage = (value, total) =>
		total > 0 ? ((value / total) * 100).toFixed(1) : "0";

	// Pie 차트 데이터
	const scheduleStatis = {
		labels: [
			`서류전형 (${getPercentage(document, totalApplications)}%)`,
			`1차면접 (${getPercentage(first, totalApplications)}%)`,
			`2차면접 (${getPercentage(second, totalApplications)}%)`,
			`최종 (${getPercentage(final, totalApplications)}%)`,
		],
		datasets: [
			{
				label: "전형별 통계",
				data: [document, first, second, final],
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(54, 162, 235, 0.6)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(54, 162, 235, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const passRateData = {
		labels: ["서류전형", "1차면접", "2차면접", "최종전형"],
		datasets: [
			{
				label: "전형별 통과율(%)",
				data: [75, 60, 45, 30], // mock data
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(54, 162, 235, 0.6)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(54, 162, 235, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				labels: {
					boxWidth: 10,
					padding: 20,
				},
			},
		},
		layout: {
			padding: {
				top: 10,
				bottom: 10,
			},
		},
	};

	const barOptions = {
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				max: 100,
				ticks: {
					stepSize: 10,
				},
			},
		},
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
		},
	};

	if (isLoading) {
		return <div>로딩중..</div>;
	}

	return (
		<div className="flex flex-col w-full h-full p-2 space-y-3">
			<div className="flex flex-col space-y-1 items-center w-full h-full border border-gray-300 p-3 rounded-lg">
				<div>전형별 비율</div>
				<hr className="w-full" />
				<div className=" flex justify-around items-center w-full h-full">
					<div className="w-full h-full">
						<Pie data={scheduleStatis} options={options} />
					</div>
					<div className="flex flex-col justify-around items-center w-full h-full border rounded-lg">
						<div className="flex w-full justify-around">
							<div>서류전형</div>
							<div>{document}</div>
						</div>
						<div className="flex w-full justify-around">
							<div>1차면접</div>
							<div>{first}</div>
						</div>
						<div className="flex w-full justify-around">
							<div>2차면접</div>
							<div>{second}</div>
						</div>
						<div className="flex w-full justify-around">
							<div>최종전형</div>
							<div>{final}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-1 items-center w-full h-full border border-gray-300 p-3 rounded-lg">
				<div>전형별 통과율(%)</div>
				<hr className="w-full" />
				<div className="flex justify-around items-center w-full h-full">
					<div className="w-full h-full">
						<Bar data={passRateData} options={barOptions} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
