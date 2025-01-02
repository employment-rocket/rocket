import React from "react";
import PersonalQuestionBox from "./PersonalQuestionBox";

const PersonalContainer = ({ checkedQuestions, setCheckedQuestions }) => {
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
            <PersonalQuestionBox
                onAddCheckedQuestion={handleAddCheckedQuestion}
                onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                checkedQuestions={checkedQuestions}
            />
        </div>
    );
};

export default PersonalContainer;
