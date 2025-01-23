import React from "react";
import PropTypes from "prop-types";

const AddSectionMenu = ({
  isSectionMenuOpen,
  availableSections,
  setIsSectionMenuOpen,
  handleSectionAdd,
}) => {
  return (
    <>
      <button
        className="mt-4 w-full py-2 bg-indigo-50 text-indigo-600 font-medium rounded-md hover:bg-indigo-100"
        onClick={() => setIsSectionMenuOpen(!isSectionMenuOpen)}
        aria-expanded={isSectionMenuOpen}
        aria-label="섹션 추가 메뉴 열기/닫기"
      >
        + 섹션 추가
      </button>
      {isSectionMenuOpen && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md shadow-md border border-gray-200 space-y-3">
          {availableSections.map((section, index) => (
            <button
              key={`${section.key}-${index}`}
              onClick={() => handleSectionAdd(section)}
              className="flex items-center justify-between w-full text-left px-3 py-2 rounded-md shadow-sm bg-white hover:bg-gray-100 text-black"
              aria-label={`${section.label} 추가`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{section.icon}</span>
                <span className="font-medium">{section.label}</span>
              </div>
              <span className="text-gray-400">+</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

AddSectionMenu.propTypes = {
  isSectionMenuOpen: PropTypes.bool.isRequired,
  availableSections: PropTypes.array.isRequired,
  setIsSectionMenuOpen: PropTypes.func.isRequired,
  handleSectionAdd: PropTypes.func.isRequired,
};

export default AddSectionMenu;