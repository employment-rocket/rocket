import React from "react";

const TalentPoolMenu = ({ filters, onFilterChange }) => {
  return (
    <aside className="w-1/4 p-6 border-l border-gray-300 bg-gray-50">
      <div className="space-y-6">

        <div>
          <label htmlFor="sort" className="text-sm font-semibold text-gray-700">
            정렬
          </label>
          <select
            id="sort"
            className="mt-2 block w-full border border-gray-300 rounded p-2"
            onChange={(e) => onFilterChange("sort", e.target.value)}
          >
            <option value="popularity">인기순</option>
            <option value="recent">최신순</option>
            <option value="experience">경력순</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700">기술 검색</h3>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="직무 스킬 검색"
              className="block w-full border border-gray-300 rounded p-2 pr-10"
              onChange={(e) => onFilterChange("skill", e.target.value)}
            />
            <button className="absolute right-2 top-2 text-gray-500">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Python", "JavaScript", "Java", "HTML/CSS", "React", "AWS", "Spring"].map(
              (skill) => (
                <button
                  key={skill}
                  className="text-xs bg-gray-100 text-gray-700 border border-gray-300 rounded-full px-3 py-1"
                  onClick={() => onFilterChange("skill", skill)}
                >
                  {skill}
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700">재직 기간</h3>
          <ul className="mt-2 space-y-2">
            {[
              { label: "신입", value: "entry" },
              { label: "1~3년차", value: "1-3" },
              { label: "4~6년차", value: "4-6" },
              { label: "7~9년차", value: "7-9" },
              { label: "10년차 이상", value: "10+" },
            ].map((option) => (
              <li key={option.value}>
                <input
                  type="checkbox"
                  id={option.value}
                  onChange={() => onFilterChange("tenure", option.value)}
                />
                <label htmlFor={option.value} className="ml-2 text-sm text-gray-600">
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700">커리어 상태</h3>
          <ul className="mt-2 space-y-2">
            {[
              "지금 만족하고 있어요",
              "거래형 타타입 좋아요",
              "좋은 제안에 열려있어요",
              "이직/구직 중이에요",
              "프로필(이력서) 피드백 원해요",
            ].map((state, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`career-${index}`}
                  onChange={() => onFilterChange("careerState", state)}
                />
                <label htmlFor={`career-${index}`} className="ml-2 text-sm text-gray-600">
                  {state}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700">탐색</h3>
          <ul className="mt-2 space-y-2">
            {[
              "내가 추천한 프로필 보기",
              "내가 제안한 프로필 보기",
            ].map((option, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`explore-${index}`}
                  onChange={() => onFilterChange("explore", option)}
                />
                <label htmlFor={`explore-${index}`} className="ml-2 text-sm text-gray-600">
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default TalentPoolMenu;
