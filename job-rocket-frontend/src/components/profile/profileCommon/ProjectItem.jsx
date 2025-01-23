import React from "react";

const ProjectItem = ({
  project,
  index,
  onChange,
  onDurationChange,
  onRemove,
  readonly, 
}) => {
  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-sm font-semibold mb-2 text-left">프로젝트 {index + 1}</h3>

   
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="프로젝트명을 입력해 주세요."
        value={project.name}
        onChange={(e) => onChange(project.id, "name", e.target.value)}
        disabled={readonly} 
      />

     
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="소속/기관이 없을 경우 개인 또는 기타로 입력해 주세요."
        value={project.organization}
        onChange={(e) => onChange(project.id, "organization", e.target.value)}
        disabled={readonly} 
      />

    
      <div className="flex space-x-4 mb-2">
        <select
          className="p-2 border border-gray-300 rounded"
          value={project.progress}
          onChange={(e) => onChange(project.id, "progress", e.target.value)}
          disabled={readonly} 
        >
          <option value="">선택</option>
          <option value="진행 중">진행 중</option>
          <option value="완료">완료</option>
        </select>

        <div className="flex items-center space-x-2">
          <input
            type="month"
            className="p-2 border border-gray-300 rounded"
            value={project.duration.start}
            onChange={(e) => onDurationChange(project.id, "start", e.target.value)}
            disabled={readonly}
          />
          <span>~</span>
          <input
            type="month"
            className="p-2 border border-gray-300 rounded"
            value={project.duration.end}
            onChange={(e) => onDurationChange(project.id, "end", e.target.value)}
            disabled={readonly} 
          />
        </div>
      </div>

     
      <textarea
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        rows="3"
        placeholder="프로젝트 내용과 본인의 역할, 기여도를 작성해보세요."
        value={project.description}
        onChange={(e) => onChange(project.id, "description", e.target.value)}
        disabled={readonly} 
      />

  
      {!readonly && ( 
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onRemove(project.id)}
        >
          🗑️ 삭제
        </button>
      )}
    </div>
  );
};

export default ProjectItem;
