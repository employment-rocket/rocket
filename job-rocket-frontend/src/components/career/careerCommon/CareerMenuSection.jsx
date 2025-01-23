import React from "react";
import CareerMenu from "./CareerMenu";

const CareerMenuSection = ({ handleSidebarToggle, sections, scrollToSection }) => {
  return (
    <div
      className="sticky top-0 self-start"
    >
      <CareerMenu
        onPDFToggle={handleSidebarToggle}
        isPDFOpen={false}
        sections={sections}
        scrollToSection={scrollToSection}
      />
    </div>
  );
};

export default CareerMenuSection;
