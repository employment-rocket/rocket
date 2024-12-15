import React from "react";

const PersonalQuestion = ({ question }) => {
    return (
        <div className="flex justify-between items-center px-4 py-3 border rounded-lg hover:bg-gray-100">
            <span className="text-sm text-gray-700">{question}</span>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                +
            </button>
        </div>
    );
};

export default PersonalQuestion;
