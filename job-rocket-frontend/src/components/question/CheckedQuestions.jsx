import React, { useState } from "react";
import CheckedQuestion from "./CheckedQuestion";
import { toggleAnswerIsIn } from "../../api/question/QuestionApi.jsx";

const CheckedQuestions = ({
	className,
	checkedQuestions,
	setCheckedQuestions,
	loading,
	error,
}) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const QUESTIONS_PER_PAGE = 8;

	const handleDelete = async (question) => {
		const confirm = window.confirm("선택을 해제하시겠습니까?");
		if (confirm) {
			try {
				await toggleAnswerIsIn({ answerId: question.answerId });

				const categoryKey =
					question.category === "CS" ||
					question.category === "PERSONAL"
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
			} catch (error) {
				console.error("선택 해제 중 오류 발생:", error);
				alert("선택 해제 중 문제가 발생했습니다.");
			}
		}
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	if (loading) {
		return (
			<p className="text-center text-gray-500">질문을 불러오는 중...</p>
		);
	}

	if (error) {
		return <p className="text-center text-red-500">{error}</p>;
	}

	const filteredQuestions = Object.keys(checkedQuestions).reduce(
		(filtered, categoryKey) => {
			const questions = checkedQuestions[categoryKey] || [];
			const filteredCategory = questions.filter((q) =>
				q.question.toLowerCase().includes(searchQuery.toLowerCase())
			);
			if (filteredCategory.length > 0) {
				filtered[categoryKey] = filteredCategory;
			}
			return filtered;
		},
		{}
	);

	const allFilteredQuestions = Object.values(filteredQuestions).flat();
	const totalPages = Math.ceil(
		allFilteredQuestions.length / QUESTIONS_PER_PAGE
	);
	const paginatedQuestions = allFilteredQuestions.slice(
		(currentPage - 1) * QUESTIONS_PER_PAGE,
		currentPage * QUESTIONS_PER_PAGE
	);

	const handlePageChange = (direction) => {
		if (direction === "next" && currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		} else if (direction === "prev" && currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div
			className={`${className} p-4 bg-white border-blue-400 rounded-lg shadow-md h-[75vh] flex flex-col`}
			style={{ borderWidth: "3px" }}
		>
			<h3 className="text-lg font-bold mb-4 text-center text-gray-500">
				선택한 질문 목록
			</h3>
			<hr
				style={{ borderTopWidth: "3px" }}
				className="border-blue-400 mb-4"
			/>
			<div className="mb-4">
				<input
					type="text"
					placeholder="선택 질문 검색..."
					value={searchQuery}
					onChange={handleSearchChange}
					className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
				/>
			</div>
			{paginatedQuestions.length > 0 ? (
				<div className="flex-1 overflow-y-auto">
					<ul className="space-y-2">
						{paginatedQuestions.map((question) => (
							<li key={question.qid + question.category}>
								<CheckedQuestion
									question={question}
									onDelete={() => handleDelete(question)}
								/>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p className="text-sm text-gray-500 text-center">
					검색 결과가 없습니다.
				</p>
			)}
			{totalPages > 1 && (
				<div className="flex justify-between items-center mt-4">
					<button
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
						onClick={() => handlePageChange("prev")}
						disabled={currentPage === 1}
					>
						이전
					</button>
					<span className="text-gray-700">
						{currentPage} / {totalPages}
					</span>
					<button
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
						onClick={() => handlePageChange("next")}
						disabled={currentPage === totalPages}
					>
						다음
					</button>
				</div>
			)}
		</div>
	);
};

export default CheckedQuestions;
