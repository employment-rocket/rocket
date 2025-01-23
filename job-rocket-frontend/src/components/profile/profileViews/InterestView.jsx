import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const InterestView = () => {
  const [interestField, setInterestField] = useState("전체");
  const [selectedRoles, setSelectedRoles] = useState([]); 
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        if (fetchedProfile) {
          const interestSection = fetchedProfile.sections.find(
            (section) => section.type === "INTERESTFIELD"
          );
          if (interestSection) {
            setInterestField(interestSection.data.interestField || "전체");
            setSelectedRoles(interestSection.data.selectedRoles || []);
          }
        }
        setIsProfileLoaded(true);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setIsProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
     
      {isProfileLoaded ? (
        <>
          {/* 관심 분야 표시 */}
          <div className="mb-6">
       
            <select
              value={interestField}
              disabled 
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="전체">전체</option>
              <option value="개발">개발</option>
              <option value="게임 개발">게임 개발</option>
              <option value="기획">기획</option>
              <option value="마케팅">마케팅</option>
            </select>
          </div>

          {/* 선택된 직업 표시 */}
          <div className="mt-6 text-left">
            <h3 className="text-sm font-semibold mb-4">선택된 직업:</h3>
            {selectedRoles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-indigo-500 text-white text-sm font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">선택된 직업이 없습니다.</p>
            )}
          </div>
        </>
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  );
};

export default InterestView;
