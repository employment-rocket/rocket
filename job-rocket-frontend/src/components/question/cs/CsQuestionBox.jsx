import React, { useState, useEffect } from "react";
import CsQuestion from "./CsQuestion";

const allQuestions = [
    { id: 1, category: "네트워크", question: "점심 메뉴로 뜨뜻국수가 좋은가 아니면 붕어빵이 좋은가?" },
    { id: 2, category: "데이터베이스", question: "왜 침대에 누워있으면 중력이 강해지는 걸까?" },
    { id: 3, category: "운영체제", question: "나는 언제 취업할 수 있는가?" },
    { id: 4, category: "자료구조", question: "동구 히야는 언제쯤 정처기를 따는 걸까" },
    { id: 5, category: "네트워크", question: "CS 지식 5" },
    { id: 6, category: "데이터베이스", question: "CS 지식 6" },
];

const subcategories = ["네트워크", "데이터베이스", "운영체제", "자료구조"];

const CsQuestionBox = ({ onAddCheckedQuestion, onRemoveCheckedQuestion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 4;

    const [selectedSubcategories, setSelectedSubcategories] = useState(subcategories);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSubcategories]);

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

    const filteredQuestions = allQuestions.filter((q) =>
        selectedSubcategories.includes(q.category)
    );

    const paginatedQuestions = filteredQuestions.slice(
        (currentPage - 1) * questionsPerPage,
        currentPage * questionsPerPage
    );

    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

    return (
        <div
            className="p-4 bg-gray-50 rounded-lg shadow-md h-[75vh] flex flex-col"
            style={{ fontFamily: "CookieBold" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">CS 질문 선택</h3>
                <div className="flex space-x-2">
                    {subcategories.map((subcategory) => (
                        <button
                            key={subcategory}
                            className={`px-3 py-1 text-sm rounded-md border-2 transition ${selectedSubcategories.includes(subcategory)
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                                }`}
                            onClick={() => toggleSubcategory(subcategory)}
                        >
                            {subcategory}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {paginatedQuestions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {paginatedQuestions.map((q) => (
                            <CsQuestion
                                key={q.id}
                                question={q.question}
                                category={q.category}
                                onAddCheckedQuestion={onAddCheckedQuestion}
                                onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-8">
                        선택된 카테고리에 대한 질문이 없습니다.
                    </div>
                )}
            </div>

            <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
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

export default CsQuestionBox;
