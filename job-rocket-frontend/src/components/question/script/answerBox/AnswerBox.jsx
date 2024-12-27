import React from "react";

const AnswerBox = ({ checkedQuestions }) => {
    return (
        <div className="p-4">
            <h3 className="text-lg font-bold text-center mb-4">내가 선택한 질문들</h3>
            <div className="space-y-3">
                {checkedQuestions.length > 0 ? (
                    checkedQuestions.map((question, index) => (
                        <div
                            key={index}
                            className="p-2 border rounded-md bg-white shadow-sm"
                        >
                            <p className="text-sm font-semibold">{question.question}</p>
                            <p className="text-sm text-gray-600 mt-1">{question.answer}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        선택된 질문이 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AnswerBox;
