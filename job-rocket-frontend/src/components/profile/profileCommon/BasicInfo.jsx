import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import BasicInfoForm from "./../profileForms/BasicInfoForm";

const BasicInfo = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    status: "default",
  });
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [hasSavedProfile, setHasSavedProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        const basicInfoSection = fetchedProfile.sections.find(
          (section) => section.type === "BASICINFO"
        );

        if (basicInfoSection) {
          setProfile(basicInfoSection.data || {
            name: "",
            email: "",
            phone: "",
            status: "default",
          });
          setHasSavedProfile(true);
        } else {
          setHasSavedProfile(false);
        }
      } catch (error) {
    
      } finally {
        setIsProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const profileData = {
      type: "BASICINFO",
      data: profile,
      order: 1,
    };

    try {
      await addProfile(profileData);
      setHasSavedProfile(true);
      alert("프로필이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("프로필 저장 실패:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
    }
  };

  const handleUpdate = async () => {
    const profileData = {
      type: "BASICINFO",
      data: profile,
      order: 1,
    };

    try {
      await updateProfile(profileData);
      alert("프로필이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto space-y-6">
      <BasicInfoForm
        profile={profile}
        handleChange={(e) => setProfile({ ...profile, [e.target.name]: e.target.value })}
        setJob={(selectedJob) => setProfile({ ...profile, job: selectedJob })}
        setAddress={(address) => setProfile({ ...profile, address })}
        setProfileImage={(image) => setProfile({ ...profile, profileImage: image })}
        setStatus={(status) => setProfile({ ...profile, status })}
      />

      <div className="flex justify-end mt-4">
        {isProfileLoaded ? (
          hasSavedProfile ? (
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
    </div>
  );
};

export default BasicInfo;
