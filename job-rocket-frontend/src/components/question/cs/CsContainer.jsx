import React from "react";
import CsQuestionBox from "./CsQuestionBox";

const CsContainer = ({ checkedQuestions, setCheckedQuestions }) => {
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
        <div className="w-full h-full">
            <CsQuestionBox
                onAddCheckedQuestion={handleAddCheckedQuestion}
                onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                checkedQuestions={checkedQuestions}
            />
        </div>
    );
};

export default CsContainer;