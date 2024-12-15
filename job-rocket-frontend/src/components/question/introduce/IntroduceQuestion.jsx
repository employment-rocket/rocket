import React from "react";

const IntroduceQuestion = ({ question }) => {
    return (
        <div className="p-4 bg-blue-100 rounded-lg shadow-md text-sm text-gray-700">
            {question}
        </div>
    );
};

export default IntroduceQuestion;
