import React from "react";

const ScriptCheckBox = ({
    categories,
    selectedCategories,
    setSelectedCategories,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    title,
    setTitle,
}) => {
    const handleCategoryChange = (categoryValue) => {
        if (selectedCategories.includes(categoryValue)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryValue));
        } else {
            setSelectedCategories([...selectedCategories, categoryValue]);
        }
    };

    return (
        <div className="space-y-4 font-CookieBold">
            <div className="flex flex-wrap space-x-2">
                {categories.map(({ label, value }) => (
                    <button
                        key={value}
                        className={`px-4 py-2 rounded-lg text-sm ${selectedCategories.includes(value) ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-2 border-blue-500"}`}
                        onClick={() => handleCategoryChange(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">폰트 크기</label>
                <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">질문 간 간격</label>
                <input
                    type="number"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">스크립트 제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                />
            </div>
        </div>
    );
};

export default ScriptCheckBox;
