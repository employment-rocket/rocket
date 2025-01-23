import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";

const SelfIntroductionForm = ({ order, onSave }) => {
  const [selfIntroduction, setSelfIntroduction] = useState(""); 
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); 
  const [hasSavedIntroduction, setHasSavedIntroduction] = useState(false); 


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile(); 
        const introSection = fetchedProfile.sections.find(
          (section) => section.type === "SELFINTRO"
        );

        if (introSection) {
          setSelfIntroduction(introSection.data.introduction || "");
          setHasSavedIntroduction(true); 
        } else {
          setHasSavedIntroduction(false); 
        }
        setIsProfileLoaded(true);
      } catch (error) {
        console.error("프로필 조회 실패:", error);
        setIsProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  
  const handleSave = async () => {
    const profileData = {
      type: "SELFINTRO",
      data: {
        introduction: selfIntroduction,
      },
      order: order, 
    };

    try {
      await addProfile(profileData); 
      setHasSavedIntroduction(true); 
      alert("자기소개가 성공적으로 저장되었습니다.");
      onSave && onSave("selfIntro", true); 
    } catch (error) {
      console.error("자기소개 저장 실패:", error);
      alert("자기소개 저장 중 오류가 발생했습니다.");
    }
  };


  const handleUpdate = async () => {
    const profileData = {
      type: "SELFINTRO",
      data: {
        introduction: selfIntroduction,
      },
      order: order, 
    };

    try {
      await updateProfile(profileData);
      alert("자기소개가 성공적으로 수정되었습니다.");
      onSave && onSave("selfIntro", true); 
    } catch (error) {
      console.error("자기소개 수정 실패:", error);
      alert("자기소개 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">자기소개</h2>

   
      <textarea
        placeholder="직무 경험과 핵심 역량 등 구체적인 내용을 작성해 보세요."
        className="w-full p-4 border border-gray-300 rounded-lg resize-none"
        rows={8}
        value={selfIntroduction}
        onChange={(e) => setSelfIntroduction(e.target.value)}
      ></textarea>

    
      <div className="flex justify-end mt-4">
        {isProfileLoaded ? (
          hasSavedIntroduction ? (
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

export default SelfIntroductionForm;
