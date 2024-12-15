import React, { useState } from "react";
import CsQuestion from "./CsQuestion";

const questions = [
    "CS 지식 1",
    "CS 지식 2",
    "CS 지식 3",
    "CS 지식 4",
];

const subcategories = ["네트워크", "데이터베이스", "운영체제", "자료구조"];

const CsQuestionBox = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;

    const [selectedSubcategories, setSelectedSubcategories] = useState(
        subcategories
    );

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

    return (
        <div
            className="p-4 bg-gray-50 rounded-lg shadow-md h-[75vh] flex flex-col justify-between"
            style={{ fontFamily: "CookieBold" }}
        >
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">CS 질문 선택</h3>
                    <div className="flex space-x-2">
                        {subcategories.map((subcategory) => (
                            <button
                                key={subcategory}
                                className={`px-3 py-1 text-sm rounded-md font-medium ${selectedSubcategories.includes(subcategory)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    }`}
                                onClick={() => toggleSubcategory(subcategory)}
                            >
                                {subcategory}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    {questions.map((question, index) => (
                        <CsQuestion key={index} question={question} />
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

export default CsQuestionBox;