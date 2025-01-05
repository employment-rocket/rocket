import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getStatisticsSchedule } from "../../../api/schedule/schedule";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
	const [document, setDocument] = useState(0);
	const [first, setFirst] = useState(0);
	const [second, setSecond] = useState(0);
	const [final, setFinal] = useState(0);
	const [ongoing, setOngoing] = useState(0);
	const [fail, setFail] = useState(0);
	const [passed, setPassed] = useState(0);

	const { data, isLoading } = useQuery({
		queryKey: ["statistics"],
		queryFn: getStatisticsSchedule,
	});

	useEffect(() => {
		if (data) {
			setDocument(data.Document || 0);
			setFirst(data.First || 0);
			setSecond(data.Second || 0);
			setFinal(data.Final || 0);
			setOngoing(data.Ongoing || 0);
			setFail(data.Fail || 0);
			setPassed(data.Passed || 0);
		}
	}, [data]);

	if (isLoading) {
		return <div>로딩중..</div>;
	}

	// Pie 차트 데이터
	const data1 = {
		labels: ["서류전형", "1차면접", "2차면접", "최종"],
		datasets: [
			{
				label: "전형별 통계",
				data: [document, first, second, final],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const data2 = {
		labels: ["서류탈락", "서류통과"],
		datasets: [
			{
				data: [fail, passed], // 추후 수정
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
				],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
				borderWidth: 1,
			},
		],
	};

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
						<div>{document + first + second + final}</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>서류전형</div>
						<div>{document}</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>1차면접</div>
						<div>{first}</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>2차면접</div>
						<div>{second}</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>최종</div>
						<div>{final}</div>
					</div>
				</div>

				<div className="flex justify-around w-full">
					<div className="flex flex-col items-center space-y-4">
						<div>진행중</div>
						<div>{ongoing}</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>최종합격</div>
						<div>{passed}</div>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<div>탈락</div>
						<div>{fail}</div>
					</div>
				</div>
			</div>
			<div className="flex space-x-5">
				<div className="flex flex-col items-center">
					<div>전형별 통계</div>
					<div>
						<Pie data={data1} />
					</div>
				</div>
				<div className="flex flex-col items-center">
					<div>서류 통과율</div>
					<div>
						<Pie data={data2} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
