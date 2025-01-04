import React, { useState } from "react";
import Review from "./Review";

const initialReviews = ["면접 복기 1", "면접 복기 2", "면접 복기 3", "면접 복기 4"];

const ReviewBox = ({ onSelectReview, onAddReview }) => {
    const [reviews, setReviews] = useState(initialReviews);

    const handleDelete = (index) => {
        setReviews((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div
            className="p-4 bg-white border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto"
            style={{ fontFamily: "CookieBold", borderWidth: "3px" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-center flex-1">
                    면접 복기 목록
                </h3>
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    onClick={onAddReview}
                >
                    추가
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {reviews.map((item, index) => (
                    <Review
                        key={index}
                        text={item}
                        onDelete={() => handleDelete(index)}
                        onSelect={() => onSelectReview(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewBox;
