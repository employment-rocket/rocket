import React from "react";

const Introduce = ({ text, createdAt, onDelete, onSelect }) => {
    const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length < 3) return "날짜 정보 없음";
        const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
        const date = new Date(year, month - 1, day, hour, minute, second);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("ko-KR", options);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm("삭제하시겠습니까?")) {
            onDelete();
            alert("삭제되었습니다.");
        }
    };

    return (
        <div
            className="relative p-6 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition"
            onClick={onSelect}
            style={{ fontFamily: "CookieBold" }}
        >
            <span className="block text-sm text-gray-700 font-bold mb-2">{text}</span>
            <span className="block text-xs text-gray-500">{formatDate(createdAt)}</span>
            <button
                className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700 transition"
                onClick={handleDelete}
            >
                ✖
            </button>
        </div>
    );
};

export default Introduce;
