import React, { useEffect, useState } from "react";
import ProfileCard from "./../talentPoolComponents/ProfileCard";
import TalentPoolMenu from "./../talentPoolComponents/TalentPoolMenu";
import { fetchFile } from "../../../api/profile/ProfileAPI";

const extractProfileData = async (profile) => {
  const basicInfo = profile.sections.find((section) => section.type === "BASICINFO")?.data || {};
  const interestField = profile.sections.find((section) => section.type === "INTERESTFIELD")?.data || {};
  const tags = profile.sections.find((section) => section.type === "TAGSSELECTION")?.data.tags || [];

  const profileImageFileName = profile.sections.find((section) => section.type === "PROFILE_IMAGE")?.data?.profileImage;
  let profileImage = "https://via.placeholder.com/150";

  if (profileImageFileName) {
    try {
      profileImage = await fetchFile(profileImageFileName, "PROFILE_IMAGE");
    } catch (error) {
      console.error("이미지 로드 실패:", error);
    }
  }

  return {
    memberId: profile.memberId,
    name: basicInfo.name || "이름 없음",
    job: basicInfo.job || "직업 정보 없음",
    shortIntroduction: basicInfo.shortIntroduction || "소개 없음",
    profileImage,
    interestField: interestField.interestField || "관심 분야 없음",
    selectedRoles: interestField.selectedRoles || [],
    tags,
    status: basicInfo.status || "구직 상태 없음",
    yearsOfExperience: basicInfo.yearsOfExperience || null,
    currentCompany: basicInfo.currentCompany || null,
  };
};

const TalentPoolLayout = ({ profiles = [], filters, onFilterChange, tabs, selectedTab, onTabChange }) => {
  const [processedProfiles, setProcessedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processProfiles = async () => {
      try {
        const profilesWithImages = await Promise.all(profiles.map((profile) => extractProfileData(profile)));
        setProcessedProfiles(profilesWithImages);
      } catch (error) {
        console.error("프로필 처리 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    processProfiles();
  }, [profiles]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

    <div className="lg:w-[15%]"></div>

    <main className="w-full lg:w-[85%] p-6 flex">
   
      <div className="flex-1 border-l border-gray-300 pl-6">

        <div className="flex justify-start mb-4">
          <div className="tabs-container flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`text-sm px-4 py-2 rounded-full ${
                  selectedTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => onTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processedProfiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      </div>

      <div className="w-[300px] p-10 border-l border-gray-300">
        <TalentPoolMenu filters={filters} onFilterChange={onFilterChange} />
      </div>
    </main>
  </div>
  );
};

export default TalentPoolLayout;
