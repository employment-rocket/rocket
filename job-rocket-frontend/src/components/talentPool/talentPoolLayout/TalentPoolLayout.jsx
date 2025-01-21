import React from "react";
import ProfileCard from "./../talentPoolComponents/ProfileCard";
import TalentPoolMenu from "./../talentPoolComponents/TalentPoolMenu";

const extractProfileData = (profile) => {
  const basicInfo = profile.sections.find((section) => section.type === "BASICINFO")?.data || {};
  const interestField = profile.sections.find((section) => section.type === "INTERESTFIELD")?.data || {};
  const tags = profile.sections.find((section) => section.type === "TAGSSELECTION")?.data.tags || [];

  return {
    memberId: profile.memberId, 
    name: basicInfo.name || "이름 없음",
    job: basicInfo.job || "직업 정보 없음",
    shortIntroduction: basicInfo.shortIntroduction || "소개 없음",
    profileImage: basicInfo.profileImage || "https://via.placeholder.com/150",
    interestField: interestField.interestField || "관심 분야 없음",
    selectedRoles: interestField.selectedRoles || [],
    tags,
    status: basicInfo.status || "구직 상태 없음", 
    yearsOfExperience: basicInfo.yearsOfExperience || null, 
    currentCompany: basicInfo.currentCompany || null, 
  };
};

const TalentPoolLayout = ({ profiles = [], filters, onFilterChange }) => {
  const processedProfiles = profiles.map(extractProfileData);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">

      <div className="flex w-full max-w-screen-xl">
      
        <main className="w-3/4 p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Talent Pool</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedProfiles.map((profile, index) => (
              <ProfileCard key={index} profile={profile} />
            ))}
          </div>
        </main>

        <TalentPoolMenu filters={filters} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
};

export default TalentPoolLayout;
