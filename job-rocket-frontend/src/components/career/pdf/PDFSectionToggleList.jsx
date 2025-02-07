import React from "react";

const PDFSectionToggleList = ({ sections, setSections }) => {
  const toggleSection = (sectionName) => {
    setSections((prev) =>
      prev.map((section) =>
        section.name === sectionName
          ? { ...section, visible: !section.visible }
          : section
      )
    );
  };

  const filteredSections = sections
    .filter(
      (section) =>
        section.name !== "BASICINFO" &&
        section.name !== "TAGSSELECTION" &&
        section.name !== "INTERESTFIELD" &&
        section.name !== "PROFILE_IMAGE"
    )
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
      {filteredSections.map((section) => (
        <div
          key={section.name}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm"
        >
          <span className="text-sm font-medium text-gray-700">{section.label}</span>
          <button
            onClick={() => toggleSection(section.name)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center leading-none ${
              section.visible
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {section.visible ? "활성화" : "비활성화"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PDFSectionToggleList;
