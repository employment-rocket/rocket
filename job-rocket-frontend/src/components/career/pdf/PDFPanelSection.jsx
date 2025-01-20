import React from "react";
import PDFPanel from "./PDFPanel";

const PDFPanelSection = ({
  profile,
  isSidebarOpen,
  pdfPanelRef,
  profileRef,
  sections,
  setSections,
  onClose,
}) => {
  return (
    profile &&
    Object.keys(profile).length > 0 && (
      <div
        className={`fixed top-0 right-0 h-full w-[50%] bg-gray-100 shadow-lg p-6 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 사이드바 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">PDF 설정</h2>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            닫기
          </button>
        </div>

        {/* PDF 설정 내용 */}
        <PDFPanel
          ref={pdfPanelRef}
          profileRef={profileRef}
          sections={sections}
          setSections={setSections}
          onClose={onClose} 
        />
      </div>
    )
  );
};

export default PDFPanelSection;
