import React from "react";
import IntroduceQuestion from "./IntroduceQuestion";

const IntroduceQuestionBox = ({
    selectedIntroduce,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
}) => {
    const questions = [
        `${selectedIntroduce || "AI 예상 질문"} 관련 예상 질문 1`,
        `${selectedIntroduce || "AI 예상 질문"} 관련 예상 질문 2`,
        `${selectedIntroduce || "AI 예상 질문"} 관련 예상 질문 3`,
    ];

    return (
        <div
            className="p-4 bg-white border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto"
            style={{ fontFamily: "CookieBold", borderWidth: "3px" }}
        >
            <h3 className="text-lg font-bold mb-4">
                {selectedIntroduce || "AI 예상 질문"}
            </h3>
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <IntroduceQuestion
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

export default IntroduceQuestionBox;
