import React from "react";

const Review = ({ text, onDelete, onSelect }) => {
    return (
        <div
            className="relative p-6 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 flex items-center justify-between"
            onClick={onSelect}
            style={{ fontFamily: "CookieBold" }}
        >
            <span className="text-sm text-gray-700">{text}</span>
            <button
                className="absolute top-2 right-2 text-red-500 font-bold"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                ✖
            </button>
        </div>
    );
};

export default Review;
