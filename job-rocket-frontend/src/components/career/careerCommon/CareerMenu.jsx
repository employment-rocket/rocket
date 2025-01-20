import React from "react";
import CareerButton from "./CareerButton";

const CareerMenu = ({ onPDFToggle, isPDFOpen, sections, scrollToSection }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-80">

      <CareerButton onStatusChange={(status) => console.log("Profile status changed:", status)} />
      
      <hr/>

      <button
        onClick={onPDFToggle}
        className="mt-4 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all w-full"
      >
        {isPDFOpen ? "PDF 닫기" : "PDF 설정"}
      </button>


      <h3 className="text-lg font-bold text-gray-800 mb-4 mt-10">섹션 이동</h3>
      {sections && sections.length > 0 ? (
        <ul className="space-y-2">
       
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white transition"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              프로필
            </button>
          </li>
          {sections
            .filter((section) => section.visible) 
            .map((section) => (
              <li key={section.name}>
                <button
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white transition"
                  onClick={() => scrollToSection(section.name)}
                >
                  {section.label}
                </button>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">이동 가능한 섹션이 없습니다.</p>
      )}
    </div>
  );
};

export default CareerMenu;
