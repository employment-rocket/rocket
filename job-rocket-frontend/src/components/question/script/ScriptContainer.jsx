import React from "react";
import AnswerBox from "./answerBox/AnswerBox";
import ScriptOverview from "./scriptOverview/ScriptOverview";

const ScriptContainer = ({ checkedQuestions }) => {
    return (
        <div className="flex w-full h-full">
            <div className="w-1/2 border-r-2 border-gray-300">
                <AnswerBox checkedQuestions={checkedQuestions} />
            </div>
            <div className="w-1/2">
                <ScriptOverview checkedQuestions={checkedQuestions} />
            </div>
        </div>
    );
};

export default ScriptContainer;