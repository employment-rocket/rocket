import React, { useState, useEffect } from "react";
import SectionList from "./SectionList";
import AddSectionMenu from "./AddSectionMenu";
import { updateOrder } from "../../../api/profile/ProfileAPI";
import SidebarToggle from "./SidebarToggle";

const Sidebar = ({ forms, setForms, toggleForm }) => {
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const [toggleStates, setToggleStates] = useState({
    hubRegister: false,
    share: false,
    showContact: false,
  });

  useEffect(() => {
    const activeSections = forms.filter((form) => form.active).sort((a, b) => a.order - b.order);
    const inactiveSections = forms.filter((form) => !form.active);

    setSidebarItems(activeSections);
    setAvailableSections(inactiveSections);
  }, [forms]);

  const handleSidebarToggle = (key) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDrop = async (index) => {
    if (draggingIndex === null) return;

    const startOrder = 4;

   
    const updatedItems = [...sidebarItems];
    const [draggedItem] = updatedItems.splice(draggingIndex, 1);
    updatedItems.splice(index, 0, draggedItem);

    
    const reorderedItems = updatedItems.map((item, idx) => ({
      ...item,
      order: idx + startOrder, 
    }));

    console.log("Reordered sidebar items:", reorderedItems);

    
    setSidebarItems(reorderedItems);

 
    const updatedForms = forms.map((form) => {
      const updatedItem = reorderedItems.find((item) => item.key === form.key);
      return updatedItem
        ? { ...form, order: updatedItem.order }
        : form;
    });

    setForms(updatedForms); 

    try {
    
      const changedSections = reorderedItems.map((item) => ({
        type: item.key,
        order: item.order,
      }));
      console.log("Sending to backend:", changedSections);
      await updateOrder(changedSections);
    } catch (error) {
      console.error("섹션 순서 저장 실패:", error);
    } finally {
      setDraggingIndex(null);
    }
  };

  const handleSectionAdd = (section) => {
    if (sidebarItems.some((item) => item.key === section.key)) {
      alert("이미 추가된 섹션입니다.");
      return;
    }

    const startOrder = 4;

 
    const updatedSidebarItems = [
      ...sidebarItems,
      {
        ...section,
        active: true,
        order: sidebarItems.length + startOrder, 
      },
    ];

    const updatedAvailableSections = availableSections.filter(
      (item) => item.key !== section.key
    );

    setSidebarItems(updatedSidebarItems);
    setAvailableSections(updatedAvailableSections);
    syncForms(updatedSidebarItems, updatedAvailableSections);
  };

  const handleSectionRemove = (section) => {
    const updatedSidebarItems = sidebarItems.filter(
      (item) => item.key !== section.key
    );
    const updatedAvailableSections = [
      ...availableSections,
      { ...section, active: false },
    ];

    setSidebarItems(updatedSidebarItems);
    setAvailableSections(updatedAvailableSections);
    syncForms(updatedSidebarItems, updatedAvailableSections);
  };

  const syncForms = (updatedSidebarItems, updatedAvailableSections) => {
    const finalForms = forms.map((form) => {
      const updatedItem = updatedSidebarItems.find(
        (item) => item.key === form.key
      );
      if (updatedItem) {
        return { ...form, order: updatedItem.order, active: true };
      }
      const inactiveItem = updatedAvailableSections.find(
        (item) => item.key === form.key
      );
      if (inactiveItem) {
        return { ...form, active: false, order: 0 }; 
      }
      return form;
    });
    setForms(finalForms);
  };

  return (
    <div className="w-80 bg-white p-5 rounded-lg shadow-lg border border-gray-200 sticky top-5 h-fit">
      {isSavingOrder && (
        <div className="text-sm text-blue-500">순서 저장 중...</div>
      )}

      <div className="flex flex-col space-y-4 mb-4">
        <SidebarToggle
          isActive={toggleStates.hubRegister}
          label="프로필 등록"
          onToggle={() => handleSidebarToggle("hubRegister")}
        />
        <SidebarToggle
          isActive={toggleStates.share}
          label="프로필 공유"
          onToggle={() => handleSidebarToggle("share")}
        />
        <SidebarToggle
          isActive={toggleStates.showContact}
          label="주소, 연락처 보이기"
          onToggle={() => handleSidebarToggle("showContact")}
          isDisabled={!toggleStates.share}
        />
      </div>

      <div className="border-t border-gray-300 my-4"></div>

      <SectionList
        sidebarItems={sidebarItems}
        handleDragStart={handleDragStart}
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