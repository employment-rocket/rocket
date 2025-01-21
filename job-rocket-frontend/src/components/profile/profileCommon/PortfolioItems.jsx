const PortfolioItems = ({
  items,
  type,
  handleAddItem,
  handleItemChange,
  handleRemoveItem,
  handleFileUpload,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2">
        {type === "url" ? "URL" : "첨부 파일"}
      </h3>
      {type === "url" ? (
        items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="https:// URL 입력"
              value={item.value}
              onChange={(e) => handleItemChange(item.id, e.target.value)}
            />
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveItem(item)}
            >
              🗑️
            </button>
          </div>
        ))
      ) : (
        <>
          <input
            type="file"
            multiple
            className="mb-2"
            onChange={handleFileUpload}
            accept=".pdf, .jpg, .png"
          />
          <ul>
            {items.map((item, index) => (
              <li key={index} className="flex items-center justify-between space-x-4 mb-2">
                <a
                  href={item.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate"
                >
                  {decodeURIComponent(item.value.split("/").pop()) || "파일"}
                </a>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => window.open(item.value, "_blank")}
                  >
                    미리보기
                  </button>
                  <a
                    href={item.value}
                    download
                    className="text-gray-500 hover:text-gray-700"
                  >
                    다운로드
                  </a>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {type === "url" && (
        <button
          className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100"
          onClick={handleAddItem}
        >
          + 링크 추가
        </button>
      )}
    </div>
  );
};

export default PortfolioItems;
