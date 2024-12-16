import React from "react";
import ReviewQuestion from "./ReviewQuestion";

const ReviewQuestionBox = ({
    selectedReview,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
}) => {
    const questions = [
        `${selectedReview || "AI 예상 질문"} 복기 질문 1`,
        `${selectedReview || "AI 예상 질문"} 복기 질문 2`,
        `${selectedReview || "AI 예상 질문"} 복기 질문 3`,
    ];

    return (
        <div
            className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto"
            style={{ fontFamily: "CookieBold" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                    {selectedReview || "AI 예상 질문"}
                </h3>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    질문 생성
                </button>
            </div>
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <ReviewQuestion
                        key={index}
                        question={question}
                        onAddCheckedQuestion={onAddCheckedQuestion}
                        onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewQuestionBox;
