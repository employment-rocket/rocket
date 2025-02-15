import React, { useEffect, useState } from "react";
import CsQuestion from "./CsQuestion";
import { getCsQuestions } from "../../../api/question/QuestionApi";

const ITEMS_PER_PAGE = 5;

const CsQuestionBox = ({
	onAddCheckedQuestion,
	onRemoveCheckedQuestion,
	checkedQuestions,
}) => {
	const [questions, setQuestions] = useState([]);
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedSubcategories, setSelectedSubcategories] = useState([
		"네트워크",
		"데이터베이스",
		"운영체제",
		"자료구조",
	]);

	const fetchQuestions = async () => {
		if (selectedSubcategories.length === 0) return;
		try {
			setLoading(true);
			const data = await getCsQuestions(selectedSubcategories);
			setQuestions(data || []);
		} catch {
			setError("CS 질문을 불러오는 중 문제가 발생했습니다.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchQuestions();
	}, []);

	useEffect(() => {
		const filtered = questions.filter(
			(q) =>
				selectedSubcategories.includes(q.subcategory) &&
				q.question.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredQuestions(filtered);
		setCurrentPage(1);
	}, [questions, selectedSubcategories, searchQuery]);

	const paginatedQuestions = filteredQuestions.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);

	const toggleSubcategory = (subcategory) => {
		setSelectedSubcategories((prev) =>
			prev.includes(subcategory)
				? prev.filter((item) => item !== subcategory)
				: [...prev, subcategory]
		);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div
			className="p-4 bg-white border-blue-400 rounded-lg shadow-md h-[75vh] flex flex-col"
			style={{ borderWidth: "3px" }}
		>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-bold">CS 질문 선택</h3>
				<input
					type="text"
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder="검색..."
					className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
				/>
			</div>
			<div className="flex space-x-2 mb-4">
				{["네트워크", "데이터베이스", "운영체제", "자료구조"].map(
					(subcategory) => (
						<button
							key={subcategory}
							className={`px-3 py-1 text-sm rounded-md border-2 transition ${
								selectedSubcategories.includes(subcategory)
									? "bg-blue-500 text-white border-blue-500"
									: "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
							}`}
							onClick={() => toggleSubcategory(subcategory)}
						>
							{subcategory}
						</button>
					)
				)}
			</div>
			<div className="flex-1 overflow-y-auto">
				{selectedSubcategories.length === 0 ? (
					<p className="text-center text-gray-500">
						카테고리를 선택해주세요.
					</p>
				) : loading ? (
					<p className="text-center text-gray-500">
						질문을 불러오는 중...
					</p>
				) : error ? (
					<p className="text-center text-red-500">{error}</p>
				) : paginatedQuestions.length > 0 ? (
					<div className="grid grid-cols-1 gap-4">
						{paginatedQuestions.map((q) => (
							<CsQuestion
								key={q.qid}
								qid={q.qid}
								answerId={q.answerId}
								question={q.question}
								answer={q.answer}
								category={q.subcategory}
								recommendedAnswer={q.suggested}
								isIn={
									checkedQuestions?.csAnswerList?.some(
										(item) => item.qid === q.qid
									) || false
								}
								onAddCheckedQuestion={onAddCheckedQuestion}
								onRemoveCheckedQuestion={
									onRemoveCheckedQuestion
								}
								checkedQuestions={checkedQuestions}
							/>
						))}
					</div>
				) : (
					<div className="text-center text-gray-500 mt-8">
						선택된 카테고리에 대한 질문이 없습니다.
					</div>
				)}
			</div>
			{selectedSubcategories.length > 0 && (
				<div className="flex justify-center space-x-2 mt-4">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(
						(page) => (
							<button
								key={page}
								className={`px-4 py-2 text-sm rounded-md font-medium ${
									currentPage === page
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-600 hover:bg-gray-300"
								}`}
								onClick={() => handlePageChange(page)}
							>
								{page}
							</button>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default CsQuestionBox;
