import React from "react";
import IntroduceQuestion from "./IntroduceQuestion";

const IntroduceQuestionBox = ({ selectedIntroduce }) => {
    const questions = [
        `${selectedIntroduce || "AI 예상 질문"} 관련 예상 질문 1`,
        `${selectedIntroduce || "AI 예상 질문"} 관련 예상 질문 2`,
        `${selectedIntroduce || "AI 예상 질문"} 관련 예상 질문 3`,
    ];

    return (
        <div
            className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto"
            style={{ fontFamily: "CookieBold" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                    {selectedIntroduce || "AI 예상 질문"}
                </h3>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
                    질문 생성
                </button>
            </div>
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <IntroduceQuestion key={index} question={question} />
                ))}
            </div>
        </div>
    );
};

export default IntroduceQuestionBox;
