import React, { useState } from "react";
import PersonalQuestion from "./PersonalQuestion";

const questions = [
    "1분 자기소개",
    "상사의 부당한 지시",
    "실패 및 극복 경험",
];

const PersonalQuestionBox = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

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
                    <h3 className="text-lg font-bold">연습할 질문 선택</h3>
                </div>
                <div className="space-y-4">
                    {questions.map((question) => (
                        <PersonalQuestion key={question} question={question} />
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
