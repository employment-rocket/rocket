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

const TalentPoolLayout = ({ profiles = [], filters, onFilterChange }) => {
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
