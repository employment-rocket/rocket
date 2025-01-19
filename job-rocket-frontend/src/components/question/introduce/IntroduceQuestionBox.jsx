import React, { useState } from "react";
import IntroduceQuestion from "./IntroduceQuestion";

const IntroduceQuestionBox = ({
    questions,
    selectedIntroduce,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
    checkedQuestions,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const questionsPerPage = 5;

    const filteredQuestions = questions.filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

    const currentQuestions = filteredQuestions.slice(
        (currentPage - 1) * questionsPerPage,
        currentPage * questionsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="p-4 bg-white border-blue-400 rounded-lg shadow-lg h-[75vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                    {selectedIntroduce || "AI 예상 질문"}
                </h3>
                <input
                    type="text"
                    placeholder="질문 검색..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border rounded-lg w-1/2"
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                {currentQuestions.map((q) => (
                    <IntroduceQuestion
                        key={q.qid}
                        qid={q.qid}
                        answerId={q.answerId}
                        question={q.question}
                        answer={q.answer}
                        isIn={
                            checkedQuestions?.introduceAnswerList?.some(
                                (item) => item.qid === q.qid
                            ) || false
                        }
                        onAddCheckedQuestion={onAddCheckedQuestion}
                        onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                        checkedQuestions={checkedQuestions}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-lg border ${currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IntroduceQuestionBox;
