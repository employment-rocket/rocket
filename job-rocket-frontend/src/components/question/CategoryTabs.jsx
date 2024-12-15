import React from "react";

const categories = [
    { name: "CS 리스트", value: "cs" },
    { name: "이력서 예상 질문", value: "introduce" },
    { name: "기업별 질문", value: "company" },
    { name: "인성 질문", value: "personal" },
    { name: "면접 복기", value: "review" },
    { name: "질문 모음", value: "script" },
];

const CategoryTabs = ({ category, setCategory }) => (
    <div className="flex space-x-4 bg-white py-4 px-6 shadow-md" style={{ fontFamily: "CookieBold" }}>
        {categories.map(({ name, value }) => (
            <button
                key={value}
                className={`w-40 px-6 py-3 text-sm font-medium rounded-lg ${category === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                    } hover:bg-blue-100`}
                onClick={() => setCategory(value)}
            >
                {name}
            </button>
        ))}
    </div>
);

export default CategoryTabs;
