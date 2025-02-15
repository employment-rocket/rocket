import React from "react";

const ScriptCheckBox = ({
	categories = [],
	selectedCategories,
	setSelectedCategories = () => {},
	fontSize = 8,
	setFontSize = () => {},
	lineHeight = 1.5,
	setLineHeight = () => {},
	title = "",
	setTitle = () => {},
}) => {
	React.useEffect(() => {
		if (selectedCategories.length === 0 && categories.length > 0) {
			setSelectedCategories(categories.map(({ value }) => value));
		}
	}, [categories, setSelectedCategories, selectedCategories]);

	const handleCategoryChange = (categoryValue) => {
		if (selectedCategories.includes(categoryValue)) {
			setSelectedCategories(
				selectedCategories.filter((cat) => cat !== categoryValue)
			);
		} else {
			setSelectedCategories([...selectedCategories, categoryValue]);
		}
	};

	return (
		<div className="border-4 border-blue-400 rounded-lg shadow-md p-6 space-y-6">
			<div>
				<label className="block text-lg font-semibold text-gray-800 mb-2">
					카테고리 설정
				</label>
				<div className="flex flex-wrap gap-2">
					{categories.map(({ label, value }) => (
						<button
							key={value}
							className={`px-4 py-2 rounded-lg text-sm font-semibold ${
								selectedCategories.includes(value)
									? "bg-blue-500 text-white"
									: "bg-gray-100 text-gray-700 border border-gray-300"
							} hover:bg-blue-600 hover:text-white transition`}
							onClick={() => handleCategoryChange(value)}
						>
							{label}
						</button>
					))}
				</div>
			</div>

			<div>
				<label className="block text-lg font-semibold text-gray-800 mb-2">
					폰트 크기
				</label>
				<input
					type="number"
					value={fontSize}
					onChange={(e) => setFontSize(Number(e.target.value))}
					className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
				/>
			</div>

			<div>
				<label className="block text-lg font-semibold text-gray-800 mb-2">
					질문 간 간격
				</label>
				<input
					type="number"
					value={lineHeight}
					onChange={(e) => setLineHeight(Number(e.target.value))}
					className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
				/>
			</div>

			<div>
				<label className="block text-lg font-semibold text-gray-800 mb-2">
					스크립트 제목
				</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
				/>
			</div>
		</div>
	);
};

export default ScriptCheckBox;
