import React, { useState } from "react";

const CheckedQuestions = ({ className }) => {
    const [checkedQuestions, setCheckedQuestions] = useState([]);

    return (
        <div
            className={`${className} p-4 border rounded-lg shadow-md bg-white h-[75vh]`}
            style={{ fontFamily: "CookieBold" }}
        >
            <h3 className="text-lg font-bold mb-4 text-center">선택한 질문</h3>
            <hr className="border-gray-300 mb-4" />
            {checkedQuestions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">
                    원하는 질문을 선택해주세요.
                </p>
            ) : (
                <ul className="space-y-2">
                    {checkedQuestions.map((question, index) => (
                        <li
                            key={index}
                            className="text-sm text-gray-700 border rounded-md p-2 hover:bg-gray-100"
                        >
                            {question}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CheckedQuestions;
