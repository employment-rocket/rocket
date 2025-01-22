import React from "react";

const SkillsSectionItem = ({
  searchTerm,
  setSearchTerm,
  stackOptions,
  selectedStacks,
  toggleStackSelection,
  handleCustomStackSelection,
}) => {
  const filteredStacks = stackOptions.filter((stack) =>
    stack.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      
      <div className="relative mb-4">
        <div className="flex items-stretch w-full">
          <input
            type="text"
            className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="직무 스킬 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={handleCustomStackSelection}
              className="bg-indigo-500 text-white px-4 rounded-r-md text-sm hover:bg-indigo-600 flex items-center justify-center"
              style={{ height: "auto", whiteSpace: "nowrap" }}
            >
              추가
            </button>
          )}
        </div>
      </div>

    
      <div className="flex flex-wrap gap-2">
        {filteredStacks.map((stack) => (
          <button
            key={stack}
            type="button"
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedStacks.includes(stack)
                ? "bg-indigo-500 text-white border-indigo-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => toggleStackSelection(stack)}
          >
            {stack}
          </button>
        ))}
      </div>

  
      {selectedStacks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-700">선택된 기술 스택:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedStacks.map((stack) => (
              <button
                key={stack}
                type="button"
                className="flex items-center px-3 py-1 rounded-full bg-indigo-500 text-white text-sm font-medium"
                onClick={() => toggleStackSelection(stack)} 
              >
                {stack}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSectionItem;
