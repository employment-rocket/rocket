import React from "react";

const CheckedQuestion = ({ question, onDelete }) => {
    return (
        <div className="flex justify-between items-center text-sm text-gray-700 border rounded-md p-2 hover:bg-gray-100">
            <span>{question}</span>
            <button
                className="px-2 py-1 text-sm text-white bg-red-500 rounded-full hover:bg-red-600 transition"
                onClick={onDelete}
            >
                -
            </button>
        </div>
    );
};

export default CheckedQuestion;