import React from "react";

const LanguageItem = ({
  language,
  index,
  onChange,
  onRemove,
  languagesLength,
  readonly,
}) => {
  return (
    <div className="mb-4 border-t pt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">외국어 {index + 1}</h3>
       
        {!readonly && languagesLength > 1 && (
          <button
            className="text-red-500 hover:text-red-700 text-sm"
            onClick={() => onRemove(language.id)}
          >
            삭제
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`language-${language.id}`}
            className="block text-sm font-bold text-gray-700 "
          >
            언어명
          </label>
          <select
            id={`language-${language.id}`}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-bold"
            value={language.language}
            onChange={(e) => onChange(language.id, "language", e.target.value)}
            disabled={readonly} 
          >
            <option value="">선택</option>
            <option value="영어">영어</option>
            <option value="중국어">중국어</option>
            <option value="일본어">일본어</option>
            <option value="프랑스어">프랑스어</option>
            <option value="독일어">독일어</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={`level-${language.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            수준
          </label>
          <select
            id={`level-${language.id}`}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={language.level}
            onChange={(e) => onChange(language.id, "level", e.target.value)}
            disabled={readonly} 
          >
            <option value="">선택</option>
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
            <option value="원어민 수준">원어민 수준</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageItem;
