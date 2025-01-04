import React, { useState } from "react";

const AnswerCheckBox = ({
    categories,
    selectedCategories,
    setSelectedCategories,
    selectedTab,
    setSelectedTab,
    onSearch,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">내 질문 목록</h3>
                <div className="flex space-x-2">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            className={`px-4 py-2 text-sm rounded-lg ${selectedCategories.includes(category.value)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                            onClick={() => handleCategoryChange(category.value)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="질문 검색..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
            </div>
            <div className="flex justify-center">
                <button
                    className={`px-4 py-2 text-sm rounded-lg ${selectedTab === "selected" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setSelectedTab("selected")}
                >
                    선택된 질문
                </button>
                <button
                    className={`px-4 py-2 text-sm rounded-lg ${selectedTab === "unselected" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setSelectedTab("unselected")}
                >
                    미선택 질문
                </button>
            </div>
        </>
    );
};

export default AnswerCheckBox;
