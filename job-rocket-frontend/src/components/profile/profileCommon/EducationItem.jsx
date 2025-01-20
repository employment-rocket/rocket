import React from "react";

const EducationItem = ({
  education,
  index,
  onChange,
  onPeriodChange,
  onRemove,
}) => {
  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-sm font-semibold mb-2">교육 {index + 1}</h3>

  
      <select
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={education.type}
        onChange={(e) => onChange(education.id, "type", e.target.value)}
      >
        <option value="">선택</option>
        <option value="고등학교">고등학교</option>
        <option value="대학교">대학교</option>
        <option value="대학원">대학원</option>
      </select>

    
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="소속/기관이 없을 경우 개인 또는 기타로 입력해 주세요."
        value={education.organization}
        onChange={(e) => onChange(education.id, "organization", e.target.value)}
      />

     
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="전공을 입력해 주세요."
        value={education.major}
        onChange={(e) => onChange(education.id, "major", e.target.value)}
      />

     
      <div className="flex space-x-4 mb-2">
        <select
          className="p-2 border border-gray-300 rounded"
          value={education.status}
          onChange={(e) => onChange(education.id, "status", e.target.value)}
        >
          <option value="">선택</option>
          <option value="재학 중">재학 중</option>
          <option value="졸업">졸업</option>
          <option value="휴학">휴학</option>
        </select>

        <div className="flex items-center space-x-2">
          <input
            type="month"
            className="p-2 border border-gray-300 rounded"
            value={education.period.start}
            onChange={(e) =>
              onPeriodChange(education.id, "start", e.target.value)
            }
          />
          <span>~</span>
          <input
            type="month"
            className="p-2 border border-gray-300 rounded"
            value={education.period.end}
            onChange={(e) =>
              onPeriodChange(education.id, "end", e.target.value)
            }
          />
        </div>
      </div>

    
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => onRemove(education.id)}
      >
        🗑️ 삭제
      </button>
    </div>
  );
};

export default EducationItem;
