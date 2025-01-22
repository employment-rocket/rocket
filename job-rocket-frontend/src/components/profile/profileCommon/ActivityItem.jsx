import React from "react";

const ActivityItem = ({ activity, index, onChange, onRemove, readonly }) => {
  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-sm font-semibold mb-2 text-left">대외활동 {index + 1}</h3>

      <input
        type="text"
        placeholder="활동명을 입력해 주세요. (최대 300자)"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={activity.activityName}
        onChange={(e) =>
          onChange(activity.id, "activityName", e.target.value)
        }
        disabled={readonly} 
      />

      <input
        type="text"
        placeholder="소속/기관명을 입력해 주세요."
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={activity.organization}
        onChange={(e) =>
          onChange(activity.id, "organization", e.target.value)
        }
        disabled={readonly} 
      />

      <input
        type="month"
        placeholder="YYYY"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={activity.activityYear}
        onChange={(e) =>
          onChange(activity.id, "activityYear", e.target.value)
        }
        disabled={readonly} 
      />

      <textarea
        placeholder="활동 내용과 본인의 역할, 기여도 등을 구체적으로 작성해보세요."
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        rows={4}
        value={activity.description}
        onChange={(e) =>
          onChange(activity.id, "description", e.target.value)
        }
        disabled={readonly}
      />

      {!readonly && (
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onRemove(activity.id)}
        >
          🗑️ 삭제
        </button>
      )}
    </div>
  );
};

export default ActivityItem;
