import React, { useState, useEffect } from "react";
import { updatePublicStatus, getProfile } from "../../../api/profile/ProfileAPI";

const CareerButton = ({ onStatusChange }) => {
  const [profileRegister, setProfileRegister] = useState(false); 
  const [statusMessage, setStatusMessage] = useState(""); 


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile?.public !== undefined) {
          setProfileRegister(profile.public); 
        }
      } catch (error) {
        console.error("프로필 상태를 가져오는 데 실패했습니다:", error.message);
      }
    };

    fetchProfile();
  }, []);

  
  const handleProfileRegister = async (checked) => {
    try {
      await updatePublicStatus(checked); 
      setProfileRegister(checked);
      setStatusMessage(`프로필이 ${checked ? "등록" : "비공개"} 상태로 업데이트되었습니다.`);
      if (onStatusChange) onStatusChange(checked); 
    } catch (error) {
      console.error("프로필 등록 상태 업데이트 실패:", error.message);
      setStatusMessage("프로필 상태 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full py-2">
        <span className="text-gray-700 text-sm font-medium">프로필 등록</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={profileRegister} 
            onChange={(e) => handleProfileRegister(e.target.checked)} 
            className="sr-only peer"
          />
          <div
            className={`w-10 h-6 ${
              profileRegister ? "bg-blue-500" : "bg-gray-200"
            } rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-500 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
          ></div>
        </label>
      </div>

    
      {statusMessage && (
        <div className="mt-4 bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default CareerButton;
