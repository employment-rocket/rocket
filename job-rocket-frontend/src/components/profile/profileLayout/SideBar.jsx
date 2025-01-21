import React, { useState } from "react";
import SectionList from "./SectionList";
import AddSectionMenu from "./AddSectionMenu";
import SidebarToggle from "./SidebarToggle";
import UseSidebar from "./UseSidebar";

const Sidebar = ({ forms, setForms, toggleForm }) => {
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    hubRegister: false,
  });

  const {
    sidebarItems,
    availableSections,
    draggingIndex,
    setDraggingIndex,
    handleDrop,
    handleSectionAdd,
    handleSectionRemove,
  } = UseSidebar(forms, setForms);

  const handleSidebarToggle = (key) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="w-80 bg-white p-5 rounded-lg shadow-lg border border-gray-200 sticky top-5 h-fit">
      <div className="flex flex-col space-y-4 mb-4">
        <SidebarToggle
          isActive={toggleStates.hubRegister}
          label="프로필 등록"
          onToggle={() => handleSidebarToggle("hubRegister")}
        />
      </div>
      <SectionList
        sidebarItems={sidebarItems}
        handleDragStart={setDraggingIndex}
        handleDrop={handleDrop}
        handleToggle={toggleForm}
        handleSectionRemove={handleSectionRemove}
      />
      <AddSectionMenu
        isSectionMenuOpen={isSectionMenuOpen}
        availableSections={availableSections}
        setIsSectionMenuOpen={setIsSectionMenuOpen}
        handleSectionAdd={handleSectionAdd}
      />
    </div>
  );
};

export default Sidebar;
