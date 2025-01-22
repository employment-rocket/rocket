import React from "react";

const ExperienceItem = ({
  experience,
  index,
  onChange,
  onRemove,
}) => {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md relative">
      <h3 className="text-lg font-bold mb-4">경력 {index + 1}</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="회사명"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={experience.companyName}
          onChange={(e) => onChange(experience.id, "companyName", e.target.value)}
        />
        <input
          type="text"
          placeholder="직책"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={experience.position}
          onChange={(e) => onChange(experience.id, "position", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">시작 날짜</label>
          <input
            type="date"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={experience.startDate}
            onChange={(e) => onChange(experience.id, "startDate", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">종료 날짜</label>
          <input
            type="date"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={experience.endDate}
            onChange={(e) => onChange(experience.id, "endDate", e.target.value)}
            disabled={experience.isCurrentlyWorking}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            checked={experience.isCurrentlyWorking}
            onChange={(e) => onChange(experience.id, "isCurrentlyWorking", e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-700">현재 재직 중</span>
        </label>
      </div>

      <textarea
        rows="4"
        placeholder="구체적인 역할과 성과를 작성하세요."
        className="block w-full mt-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={experience.tasks}
        onChange={(e) => onChange(experience.id, "tasks", e.target.value)}
      ></textarea>

      <button
        onClick={() => onRemove(experience.id)}
        className="absolute top-4 right-4 text-red-600 hover:underline"
      >
        삭제
      </button>
    </div>
  );
};

export default ExperienceItem;
