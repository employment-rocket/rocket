import React, { useState } from "react";
import ReviewBox from "../review/ReviewBox";
import ReviewQuestionBox from "../review/ReviewQuestionBox";

const ReviewContainer = ({ checkedQuestions, setCheckedQuestions }) => {
    const [selectedReview, setSelectedReview] = useState(null);

    const handleAddCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            reviewAnswerList: [
                ...(prev.reviewAnswerList || []),
                question,
            ],
        }));
    };

    const handleRemoveCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            reviewAnswerList: prev.reviewAnswerList.filter(
                (q) => q.qid !== question.qid
            ),
        }));
    };

    return (
        <div className="flex w-full h-full space-x-4">
            <div className="w-1/4">
                <ReviewBox
                    onSelectReview={(item) => setSelectedReview(item)}
                />
            </div>
            <div className="w-3/4">
                <ReviewQuestionBox
                    selectedReview={selectedReview}
                    onAddCheckedQuestion={handleAddCheckedQuestion}
                    onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                />
            </div>
        </div>
    );
};

export default ReviewContainer;
