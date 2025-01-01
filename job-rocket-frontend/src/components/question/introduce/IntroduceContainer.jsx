import React, { useState } from "react";
import IntroduceBox from "../introduce/IntroduceBox";
import IntroduceQuestionBox from "../introduce/IntroduceQuestionBox";

const IntroduceContainer = ({ checkedQuestions, setCheckedQuestions }) => {
    const [selectedIntroduce, setSelectedIntroduce] = useState(null);

    const handleAddCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            introduceAnswerList: [
                ...(prev.introduceAnswerList || []),
                question,
            ],
        }));
    };

    const handleRemoveCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            introduceAnswerList: prev.introduceAnswerList.filter(
                (q) => q.qid !== question.qid
            ),
        }));
    };

    return (
        <div className="flex w-full h-full space-x-4">
            <div className="w-1/4">
                <IntroduceBox
                    onSelectIntroduce={(item) => setSelectedIntroduce(item)}
                />
            </div>
            <div className="w-3/4">
                <IntroduceQuestionBox
                    selectedIntroduce={selectedIntroduce}
                    onAddCheckedQuestion={handleAddCheckedQuestion}
                    onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                />
            </div>
        </div>
    );
};

export default IntroduceContainer;
