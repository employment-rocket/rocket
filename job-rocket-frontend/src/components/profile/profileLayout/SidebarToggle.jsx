import React from "react";
import PropTypes from "prop-types";

const SidebarToggle = ({ isActive, label, onToggle, isDisabled = false }) => {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm font-medium ${
          isActive ? "text-gray-700 font-bold" : "text-gray-400"
        }`}
      >
        {label}
      </span>
      <button
        onClick={onToggle}
        disabled={isDisabled}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${
          isDisabled
            ? "bg-gray-300 opacity-50 cursor-not-allowed"
            : isActive
            ? "bg-indigo-500"
            : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
            isActive ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

SidebarToggle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default SidebarToggle;