import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import SkillsSectionItem from "../profileCommon/SkillsSectionItem";

const SkillsSelectionForm = ({ order, onSave }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [hasSavedStacks, setHasSavedStacks] = useState(false);

  const [stackOptions] = useState([
    "Python",
    "JavaScript",
    "국비지원 부트캠프",
    "Java",
    "HTML/CSS",
    "React",
    "AWS",
    "Spring",
    "머신러닝",
    "SQL",
    "인공지능(AI)",
    "ChatGPT",
    "딥러닝",
    "빅데이터",
    "MS-Office",
    "Spring Boot",
    "Excel",
    "Node.js",
    "C#",
    "Unity",
  ]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        if (fetchedProfile) {
          const skillsSection = fetchedProfile.sections.find(
            (section) => section.type === "SKILLS"
          );
          if (skillsSection) {
            setSelectedStacks(skillsSection.data.stacks || []);
            setHasSavedStacks(true);
          } else {
            setHasSavedStacks(false);
          }
        }
        setIsProfileLoaded(true);
      } catch (error) {
        console.error("프로필 조회 실패:", error);
        setIsProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  const toggleStackSelection = (stack) => {
    if (selectedStacks.includes(stack)) {
      setSelectedStacks(selectedStacks.filter((s) => s !== stack));
    } else {
      setSelectedStacks([...selectedStacks, stack]);
    }
  };

  const handleCustomStackSelection = () => {
    if (searchTerm.trim() && !selectedStacks.includes(searchTerm)) {
      setSelectedStacks([...selectedStacks, searchTerm.trim()]);
    }
    setSearchTerm("");
  };

  const handleSave = async () => {
    const profileData = {
      type: "SKILLS",
      data: { stacks: selectedStacks },
      order,
    };

    try {
      await addProfile(profileData);
      setHasSavedStacks(true);
      alert("기술 스택이 성공적으로 저장되었습니다.");
      onSave && onSave("skills", true);
    } catch (error) {
      console.error("기술 스택 저장 실패:", error);
      alert("기술 스택 저장 중 오류가 발생했습니다.");
    }
  };

  const handleUpdate = async () => {
    const profileData = {
      type: "SKILLS",
      data: { stacks: selectedStacks },
      order,
    };

    try {
      await updateProfile(profileData);
      alert("기술 스택이 성공적으로 수정되었습니다.");
      onSave && onSave("skills", true);
    } catch (error) {
      console.error("기술 스택 수정 실패:", error);
      alert("기술 스택 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">기술 검색</h2>
        {isProfileLoaded ? (
          hasSavedStacks ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              수정
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              저장
            </button>
          )
        ) : (
          <div>로딩 중...</div>
        )}
      </div>

      <SkillsSectionItem
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        stackOptions={stackOptions}
        selectedStacks={selectedStacks}
        toggleStackSelection={toggleStackSelection}
        handleCustomStackSelection={handleCustomStackSelection}
      />
    </div>
  );
};

export default SkillsSelectionForm;
