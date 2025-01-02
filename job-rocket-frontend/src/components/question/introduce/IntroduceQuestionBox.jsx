import React from "react";
import IntroduceQuestion from "./IntroduceQuestion";

const IntroduceQuestionBox = ({
    questions,
    selectedIntroduce,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
    checkedQuestions
}) => {
    return (
        <div className="p-4 bg-white border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{selectedIntroduce || "AI 예상 질문"}</h3>
            <div className="space-y-4">
                {questions.map((q) => (
                    <IntroduceQuestion
                        key={q.qid}
                        qid={q.qid}
                        answerId={q.answerId}
                        question={q.question}
                        answer={q.answer}
                        isIn={checkedQuestions?.introduceAnswerList?.some((item) => item.qid === q.qid) || false}
                        onAddCheckedQuestion={onAddCheckedQuestion}
                        onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                        checkedQuestions={checkedQuestions}
                    />
                ))}
            </div>
        </div>
    );
};

export default IntroduceQuestionBox;
