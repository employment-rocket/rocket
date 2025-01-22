import React, { useEffect, useState } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const SkillsView = () => {
  const [selectedStacks, setSelectedStacks] = useState([]); 
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); 

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 text-left">
      {isProfileLoaded ? (
        selectedStacks.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedStacks.map((stack) => (
              <span
                key={stack}
                className="px-3 py-1 rounded-full bg-indigo-500 text-white text-sm font-medium"
              >
                {stack}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">저장된 기술 스택이 없습니다.</p>
        )
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  );
};

export default SkillsView;
