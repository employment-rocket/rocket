import React from "react";
import AnswerBox from "./answerBox/AnswerBox";
import ScriptOverview from "./scriptOverview/ScriptOverview";

const ScriptContainer = ({ checkedQuestions, setCheckedQuestions }) => {
	const categories = [
		{ label: "인성", value: "PERSONAL" },
		{ label: "CS", value: "CS" },
		{ label: "자소서", value: "INTRODUCE_QA" },
		{ label: "복기", value: "REVIEW_QA" },
	];

	const handleAddCheckedQuestion = (question) => {
		const categoryKey =
			question.category === "CS" || question.category === "PERSONAL"
				? `${question.category.toLowerCase()}AnswerList`
				: `${question.category
						.toLowerCase()
						.replace("_qa", "")}AnswerList`;

		setCheckedQuestions((prev) => {
			const existingList = prev[categoryKey] || [];
			const updatedList = existingList.map((q) =>
				q.qid === question.qid ? question : q
			);

			const isNewQuestion = !existingList.some(
				(q) => q.qid === question.qid
			);
			if (isNewQuestion) {
				updatedList.push(question);
			}

			return {
				...prev,
				[categoryKey]: updatedList,
			};
		});
	};

	const handleRemoveCheckedQuestion = (question) => {
		const categoryKey =
			question.category === "CS" || question.category === "PERSONAL"
				? `${question.category.toLowerCase()}AnswerList`
				: `${question.category
						.toLowerCase()
						.replace("_qa", "")}AnswerList`;

		setCheckedQuestions((prev) => ({
			...prev,
			[categoryKey]: prev[categoryKey]?.filter(
				(q) => q.qid !== question.qid
			),
		}));
	};

	return (
		<div className="flex flex-col mt-1 lg:flex-row w-full h-full">
			<div
				className="flex-1 border-2 border-blue-400 rounded-lg p-4 bg-white shadow-md"
				style={{ borderWidth: "3px" }}
			>
				<AnswerBox
					categories={categories}
					checkedQuestions={checkedQuestions}
					onAddCheckedQuestion={handleAddCheckedQuestion}
					onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
				/>
			</div>
			<div
				className="flex-1 rounded-lg p-4 ml-2 border-blue-400 bg-white"
				style={{ borderWidth: "3px" }}
			>
				<ScriptOverview
					categories={categories}
					checkedQuestions={checkedQuestions}
				/>
			</div>
		</div>
	);
};

export default ScriptContainer;
