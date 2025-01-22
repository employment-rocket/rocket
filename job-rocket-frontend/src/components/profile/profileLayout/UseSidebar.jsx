import { useState, useEffect } from "react";
import { updateOrder } from "../../../api/profile/ProfileAPI";

const UseSidebar = (forms, setForms) => {
  const [sidebarItems, setSidebarItems] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  useEffect(() => {
    const activeSections = forms.filter((form) => form.active).sort((a, b) => a.order - b.order);
    const inactiveSections = forms.filter((form) => !form.active);

    setSidebarItems(activeSections);
    setAvailableSections(inactiveSections);
  }, [forms]);

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
      await updateOrder(changedSections);
    } catch (error) {
      console.error("섹션 순서 저장 실패:", error);
    } finally {
      setDraggingIndex(null);
    }
  };

  const syncForms = (updatedSidebarItems, updatedAvailableSections) => {
    const finalForms = forms.map((form) => {
      const updatedItem = updatedSidebarItems.find((item) => item.key === form.key);
      if (updatedItem) {
        return { ...form, order: updatedItem.order, active: true };
      }
      const inactiveItem = updatedAvailableSections.find((item) => item.key === form.key);
      if (inactiveItem) {
        return { ...form, active: false, order: 0 };
      }
      return form;
    });
    setForms(finalForms);
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

    const updatedAvailableSections = availableSections.filter((item) => item.key !== section.key);

    setSidebarItems(updatedSidebarItems);
    setAvailableSections(updatedAvailableSections);
    syncForms(updatedSidebarItems, updatedAvailableSections);
  };

  const handleSectionRemove = (section) => {
    const updatedSidebarItems = sidebarItems.filter((item) => item.key !== section.key);
    const updatedAvailableSections = [
      ...availableSections,
      { ...section, active: false },
    ];

    setSidebarItems(updatedSidebarItems);
    setAvailableSections(updatedAvailableSections);
    syncForms(updatedSidebarItems, updatedAvailableSections);
  };

  return {
    sidebarItems,
    availableSections,
    draggingIndex,
    setDraggingIndex,
    handleDrop,
    handleSectionAdd,
    handleSectionRemove,
  };
};

export default UseSidebar;
