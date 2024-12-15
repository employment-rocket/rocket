import React, { useState } from "react";

const CsQuestion = ({
    question,
    category,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
}) => {
    const [isAnswering, setIsAnswering] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [answer, setAnswer] = useState("");

    const toggleAnswerInput = (e) => {
        e.stopPropagation();
        setIsAnswering((prev) => !prev);
    };

    const handleInputChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleToggleCheckedQuestion = (e) => {
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
        <div className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleAnswerInput}
            >
                <div>
                    <span className="text-sm text-gray-700 font-semibold">{question}</span>
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                        {category}
                    </span>
                </div>
                <button
                    className={`px-3 py-1 text-sm rounded-md border-2 transition ${isSelected
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                        }`}
                    onClick={handleToggleCheckedQuestion}
                >
                    V
                </button>
            </div>

            <hr className="border-gray-300 my-3" />

            {isAnswering && (
                <div>
                    <textarea
                        value={answer}
                        onChange={handleInputChange}
                        placeholder="답변을 입력하세요..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        rows="3"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            onClick={() => setIsAnswering(false)}
                        >
                            저장
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CsQuestion;
