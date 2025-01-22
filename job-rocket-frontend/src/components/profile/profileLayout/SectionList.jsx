import React from "react";
import PropTypes from "prop-types";

const SectionList = ({
  sidebarItems,
  handleDragStart,
  handleDrop,
  handleToggle,
  handleSectionRemove,
}) => {
  const preventDefault = (e) => e.preventDefault();

  return (
    <ul className="space-y-3">
      {sidebarItems.map((item, index) => (
        <li
          key={item.key}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={preventDefault}
          onDrop={() => handleDrop(index)}
          className={`flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md shadow-sm border cursor-move ${
            item.active ? "border-indigo-500" : "border-gray-200"
          }`}
        >
      
          <div
            className={`flex items-center space-x-2 cursor-pointer ${
              item.active ? "text-indigo-600" : "text-gray-700"
            }`}
            onClick={() => handleToggle(item.key)}
            aria-label={`섹션 활성화/비활성화: ${item.label}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span
              className={`font-medium ${
                item.active
                  ? "bg-indigo-100 px-2 py-1 rounded-md"
                  : "hover:bg-gray-200 px-2 py-1 rounded-md"
              }`}
            >
              {item.label}
            </span>
          </div>
       
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleSectionRemove(item);
            }}
            aria-label={`${item.label} 섹션 제거`}
          >
            &#x2796;
          </button>
        </li>
      ))}
    </ul>
  );
};

SectionList.propTypes = {
  sidebarItems: PropTypes.array.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleSectionRemove: PropTypes.func.isRequired,
};

export default SectionList;