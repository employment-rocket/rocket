import React from "react";

const categories = [
	{ name: "인성 질문", value: "PERSONAL" },
	{ name: "CS 질문", value: "CS" },
	{ name: "자소서 기반 질문", value: "INTRODUCE" },
	{ name: "면접 복기", value: "REVIEW" },
	{ name: "나의 스크립트", value: "SCRIPT" },
];

const CategoryTabs = ({ category, setCategory }) => (
	<div className="flex space-x-4 bg-white py-4 px-6 shadow-md">
		{categories.map(({ name, value }) => (
			<button
				key={value}
				className={`w-40 px-6 py-3 text-sm font-medium rounded-lg ${
					category === value
						? "bg-blue-500 text-white"
						: "bg-gray-100 text-gray-600"
				} hover:bg-blue-100`}
				onClick={() => setCategory(value)}
			>
				{name}
			</button>
		))}
	</div>
);

export default CategoryTabs;
