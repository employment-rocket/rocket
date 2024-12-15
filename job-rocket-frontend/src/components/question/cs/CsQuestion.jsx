import React, { useState } from "react";

const CsQuestion = ({
    question,
    category,
    recommendedAnswer,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
}) => {
    const [isAnswering, setIsAnswering] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [answer, setAnswer] = useState("");
    const [showRecommendedAnswer, setShowRecommendedAnswer] = useState(false);

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

    const toggleRecommendedAnswer = (e) => {
        e.stopPropagation();
        setShowRecommendedAnswer((prev) => !prev);
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleAnswerInput}>
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
                    <div className="flex justify-between mt-2">
                        <button
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            onClick={toggleRecommendedAnswer}
                        >
                            {showRecommendedAnswer ? "추천 답변 숨기기" : "추천 답변 보기"}
                        </button>
                        <button
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            onClick={() => setIsAnswering(false)}
                        >
                            저장
                        </button>
                    </div>
                    {showRecommendedAnswer && (
                        <div className="mt-3 p-2 bg-gray-100 rounded-lg text-sm text-gray-700">
                            <strong>추천 답변:</strong> {recommendedAnswer}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CsQuestion;
