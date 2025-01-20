import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";
import { useNavigate } from "react-router";

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

        if (fetchedProfile && fetchedProfile.sections && fetchedProfile.sections[0].data) {
          const profileData = fetchedProfile.sections[0].data;

          setProfile(profileData);
        }
        setLoading(false);
      } catch (err) {
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
            <label className="text-lg font-bold text-gray-700 w-32">이메일</label>
            <span className="text-lg">{profile?.email || "이메일 없음"}</span>
          </div>

          <div className="flex items-center">
            <label className="text-lg font-bold text-gray-700 w-32">휴대폰 번호</label>
            <span className="text-lg">{formatPhoneNumber(profile?.phoneNumber)}</span>
          </div>

          {profile?.status && (
            <div className="flex items-center">
              <label className="text-lg font-bold text-gray-700 w-32">구직 상태</label>
              <span className="text-lg">{profile.status}</span>
            </div>
          )}

          {profile?.yearsOfExperience && profile?.currentCompany && (
            <div className="flex items-center">
              <label className="text-lg font-bold text-gray-700 w-32">연차 • 회사명</label>
              <span className="text-lg">
                {profile.yearsOfExperience}년 • {profile.currentCompany}
              </span>
            </div>
          )}


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
          <img
            src={profile?.profileImage || "/path/to/default-image.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
