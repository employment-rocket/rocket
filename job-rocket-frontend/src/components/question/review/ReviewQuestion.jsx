import React, { useState } from "react";

const ReviewQuestion = ({
    question,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
}) => {
    const [isAnswering, setIsAnswering] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [answer, setAnswer] = useState("");

    const toggleAnswerInput = (e) => {
        if (!e.target.closest("button")) {
            setIsAnswering((prev) => !prev);
        }
    };

    const handleToggleChecked = (e) => {
        e.stopPropagation();
        if (isSelected) {
            onRemoveCheckedQuestion(question);
            setIsSelected(false);
        } else {
            onAddCheckedQuestion(question);
            setIsSelected(true);
        }
    };

    return (
        <div
            className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition"
            style={{ fontFamily: "CookieBold" }}
            onClick={toggleAnswerInput}
        >
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-semibold">{question}</span>
                <button
                    className={`px-3 py-1 text-sm rounded-md border-2 transition ${isSelected
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                        }`}
                    onClick={handleToggleChecked}
                >
                    V
                </button>
            </div>
            <hr className="border-gray-300 my-3" />
            {isAnswering && (
                <div>
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="답변을 입력하세요..."
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        style={{ fontFamily: "CookieBold" }}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAnswering(false);
                            }}
                            style={{ fontFamily: "CookieBold" }}
                        >
                            저장
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewQuestion;