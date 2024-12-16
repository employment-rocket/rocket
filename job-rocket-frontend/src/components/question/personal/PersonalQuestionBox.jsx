import React, { useState, useEffect } from "react";
import PersonalQuestion from "./PersonalQuestion";

const allQuestions = [
    { id: 1, question: "1분 자기소개" },
    { id: 2, question: "상사의 부당한 지시" },
    { id: 3, question: "실패 및 극복 경험" },
    { id: 4, question: "자신의 강점은 무엇인가요?" },
    { id: 5, question: "갈등 상황에서 어떻게 해결하나요?" },
    { id: 6, question: "팀 프로젝트에서의 역할" },
];

const PersonalQuestionBox = ({ onAddCheckedQuestion, onRemoveCheckedQuestion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 4;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedQuestions = allQuestions.slice(
        (currentPage - 1) * questionsPerPage,
        currentPage * questionsPerPage
    );

    const totalPages = Math.ceil(allQuestions.length / questionsPerPage);

    return (
        <div
            className="p-4 bg-gray-50 rounded-lg shadow-md h-[75vh] flex flex-col"
            style={{ fontFamily: "CookieBold" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">연습할 질문 선택</h3>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                    {paginatedQuestions.map((q) => (
                        <PersonalQuestion
                            key={q.id}
                            question={q.question}
                            onAddCheckedQuestion={onAddCheckedQuestion}
                            onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 text-sm rounded-md font-medium ${currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PersonalQuestionBox;
