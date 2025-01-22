import React, { useState, useEffect } from "react";
import RelatedJobs from "./RelatedJobs";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";

const InterestField = () => {
  const [interestField, setInterestField] = useState("전체");
  const [selectedRoles, setSelectedRoles] = useState([]); 
  const [profile, setProfile] = useState(null);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); 

  useEffect(() => {
   
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        if (fetchedProfile) {
          setProfile(fetchedProfile);

        
          const interestSection = fetchedProfile.sections.find(
            (section) => section.type === "INTERESTFIELD"
          );
          if (interestSection) {
            setInterestField(interestSection.data.interestField || "전체");
            setSelectedRoles(interestSection.data.selectedRoles || []);
          }
        } else {
          setProfile(null);
        }
        setIsProfileLoaded(true);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setIsProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  const handleInterestFieldChange = (e) => {
    const newInterestField = e.target.value;
    setInterestField(newInterestField);
    setSelectedRoles([]); 
  };

  const handleSaveOrUpdate = async (actionType) => {
    
    if (selectedRoles.length > 5) {
      alert("최대 5개까지 직업을 선택할 수 있습니다.");
      return;
    }

    const profileData = {
      type: "INTERESTFIELD",
      data: {
        interestField,
        selectedRoles,
      },
      order: 2,
    };

    try {
      if (actionType === "save") {
        await addProfile(profileData); 
        alert("성공적으로 저장되었습니다.");
      } else if (actionType === "update") {
        await updateProfile(profileData); 
        alert("성공적으로 수정되었습니다.");
      }
      const updatedProfile = await getProfile();
      setProfile(updatedProfile);
      setIsProfileLoaded(true);
    } catch (error) {
      console.error(`${actionType === "save" ? "저장" : "수정"} 실패:`, error);
      alert("작업 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">관심 분야 선택</h2>
        {isProfileLoaded ? (
          profile && profile.sections.some((section) => section.type === "INTERESTFIELD") ? (
            <button
              onClick={() => handleSaveOrUpdate("update")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              수정
            </button>
          ) : (
            <button
              onClick={() => handleSaveOrUpdate("save")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              저장
            </button>
          )
        ) : (
          <div>로딩 중...</div>
        )}
      </div>

      <select
        value={interestField}
        onChange={handleInterestFieldChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="전체">전체</option>
        <option value="개발">개발</option>
        <option value="게임 개발">게임 개발</option>
        <option value="기획">기획</option>
        <option value="마케팅">마케팅</option>
      </select>

      {interestField !== "전체" && (
        <RelatedJobs
          interestField={interestField}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
      )}
    </div>
  );
};

export default InterestField;
