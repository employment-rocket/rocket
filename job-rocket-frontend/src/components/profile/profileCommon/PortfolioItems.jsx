import React from "react";

const PortfolioItems = ({
  items,
  handleAddItem,
  handleItemChange,
  handleRemoveItem,
  handleFileUpload,
}) => {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">URL</h3>
        {items
          .filter((item) => item.type === "url")
          .map((item) => (
            <div key={item.id} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded"
                placeholder="https:// URL 입력"
                value={item.value || ""}
                onChange={(e) => handleItemChange(item.id, e.target.value)}
              />
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item)}
              >
                🗑️
              </button>
            </div>
          ))}
        <button
          className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100"
          onClick={() => handleAddItem("url")}
        >
          + 링크 추가
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">첨부 파일</h3>
        <input
          type="file"
          multiple
          className="mb-2"
          onChange={handleFileUpload}
          accept=".pdf, .jpg, .jpeg, .png"
        />
        <ul className="space-y-2">
          {items
            .filter((item) => item.type === "file" || item.type === "image")
            .map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between space-x-4 p-2 bg-gray-50 rounded border border-gray-300"
              >
                {item.type === "file" ? (
                  <a
                    href={item.value || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-blue-500 hover:underline truncate"
                    title={item.name || "파일 이름 없음"}
                  >
                    {item.name || "파일 이름 없음"}
                  </a>
                ) : (
                  <img
                    src={item.value}
                    alt={item.name || "이미지"}
                    className="max-w-24 max-h-24 object-cover rounded"
                  />
                )}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item)}
                >
                  🗑️
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default PortfolioItems;
