import React, { useState, useEffect } from "react";
import { getProfile, fetchFile } from "../../../api/profile/ProfileAPI";

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "휴대폰 번호 없음";
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        console.log("Fetched Profile:", fetchedProfile);
    
        if (fetchedProfile && fetchedProfile.sections) {
          const profileSection = fetchedProfile.sections.find(
            (section) => section.type === "BASICINFO"
          )?.data;
    
          setProfile(profileSection || {});
    
          const profileImageFileName = fetchedProfile.sections.find(
            (section) => section.type === "PROFILE_IMAGE"
          )?.data?.profileImage;
    
          if (profileImageFileName) {
            try {
              const imageUrl = await fetchFile(profileImageFileName, "PROFILE_IMAGE");
              if (imageUrl) {
                setProfileImage(imageUrl);
              } else {
                console.error("이미지 파일을 찾을 수 없습니다.");
              }
            } catch (err) {
              console.error("이미지 요청 오류:", err);
            }
          }
        } else {
          setProfile({});
        }
        setLoading(false);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setError("프로필을 조회하는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold mb-6">프로필</h2>
      <div className="flex flex-row items-start space-x-8">
      
        <div className="flex-1 space-y-4 text-left">
          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">이름</label>
            <span className="text-lg">{profile?.name || "이름 없음"}</span>
          </div>
          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">직업</label>
            <span className="text-lg">{profile?.job || "직업 없음"}</span>
          </div>
          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">구직상태</label>
            <span className="text-lg">{profile?.status || "구직 상태 없음"}</span>
          </div>
          {/* 경력과 회사는 구직 상태가 (신입) 구직 중이에요가 아닌 경우에만 렌더링 */}
          {profile?.status !== "(신입) 구직 중이에요" && (
            <>
              <div className="flex items-center">
                <label className="text-lg font-bold text-gray-700 w-32">경력</label>
                <span className="text-lg">{profile?.yearsOfExperience || "경력 없음"}</span>
              </div>
              <div className="flex items-center">
                <label className="text-lg font-bold text-gray-700 w-32">회사</label>
                <span className="text-lg">{profile?.currentCompany || "회사 없음"}</span>
              </div>
            </>
          )}
          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">이메일</label>
            <span className="text-lg">{profile?.email || "이메일 없음"}</span>
          </div>
          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">휴대폰 번호</label>
            <span className="text-lg">{formatPhoneNumber(profile?.phoneNumber)}</span>
          </div>
          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">주소</label>
            <span className="text-lg">{profile?.address || "주소 없음"}</span>
          </div>
          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">한줄 소개</label>
            <span className="text-lg">{profile?.shortIntroduction || "한줄 소개 없음"}</span>
          </div>
        </div>

        <div className="w-48 h-60 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">이미지 없음</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
