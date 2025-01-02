import React from "react";
import AnswerBox from "./answerBox/AnswerBox";
import ScriptOverview from "./scriptOverview/ScriptOverview";

const ScriptContainer = ({ checkedQuestions, setCheckedQuestions }) => {
    const categories = [
        { label: "인성", value: "PERSONAL" },
        { label: "CS", value: "CS" },
        { label: "기업", value: "COMPANY" },
        { label: "자소서", value: "INTRODUCE" },
        { label: "복기", value: "REVIEW" },
    ];

    const handleAddCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            [`${question.category.toLowerCase()}AnswerList`]: [
                ...(prev[`${question.category.toLowerCase()}AnswerList`] || []),
                question,
            ],
        }));
    };

    const handleRemoveCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            [`${question.category.toLowerCase()}AnswerList`]: prev[`${question.category.toLowerCase()}AnswerList`].filter(
                (q) => q.qid !== question.qid
            ),
        }));
    };

    return (
        <div className="flex flex-col mt-1 lg:flex-row w-full h-full" style={{ fontFamily: "CookieBold" }}>
            <div className="flex-1 border-2 border-blue-400 rounded-lg p-4 bg-white shadow-md" style={{ borderWidth: "3px" }}>
                <AnswerBox
                    categories={categories}
                    checkedQuestions={checkedQuestions}
                    onAddCheckedQuestion={handleAddCheckedQuestion}
                    onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                />
            </div>
            <div className="flex-1 rounded-lg p-4 ml-2 border-blue-400 bg-white" style={{ borderWidth: "3px" }}>
                <ScriptOverview categories={categories} checkedQuestions={checkedQuestions} />
            </div>
        </div>
    );
};

export default ScriptContainer;
