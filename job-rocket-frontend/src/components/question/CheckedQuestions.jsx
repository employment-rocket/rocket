import React from "react";
import CheckedQuestion from "./CheckedQuestion";

const CheckedQuestions = ({ className, checkedQuestions, setCheckedQuestions }) => {
    const handleDelete = (index) => {
        setCheckedQuestions((prev) => prev.filter((_, i) => i !== index));
    };

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
                        <li key={index}>
                            <CheckedQuestion
                                question={question}
                                onDelete={() => handleDelete(index)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CheckedQuestions;
