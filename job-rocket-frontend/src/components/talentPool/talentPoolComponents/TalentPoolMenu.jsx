import React from "react";

const TalentPoolMenu = ({ filters, onFilterChange }) => {
  const isFilterSelected = (type, value) => {
    return Array.isArray(filters[type]) && filters[type].includes(value);
  };

  return (
    <aside className="lg:w-[300px] w-full lg:py-4 py-2 px-4 bg-white shadow-md rounded-lg border border-gray-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            기술 검색
          </h3>
          <input
            type="text"
            placeholder="기술 검색"
            className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 mb-3"
            onChange={(e) => onFilterChange("skillSearch", e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {[
              "Python",
              "JavaScript",
              "Java",
              "HTML/CSS",
              "React",
              "AWS",
              "Spring",
            ].map((skill) => (
              <button
                key={skill}
                className={`text-xs border rounded-full px-3 py-1 transition ${
                  isFilterSelected("skill", skill)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => onFilterChange("skill", skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            재직 기간
          </h3>
          <div className="flex flex-wrap gap-2">
            {["신입", "1-3년", "4-6년", "7-9년", "10년+"].map((value) => (
              <button
                key={value}
                className={`text-xs border rounded-full px-3 py-1 transition ${
                  isFilterSelected("tenure", value)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => onFilterChange("tenure", value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            커리어 상태
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "(신입) 구직 중이에요",
              "(경력) 이직/구직 중이에요",
              "스터디 구해요",
              "좋은 제안에 열려있어요",
              "프로필 피드백 원해요",
              "프로젝트 구해요",
            ].map((value) => (
              <button
                key={value}
                className={`text-xs border rounded-full px-3 py-1 transition ${
                  isFilterSelected("careerState", value)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => onFilterChange("careerState", value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TalentPoolMenu;
