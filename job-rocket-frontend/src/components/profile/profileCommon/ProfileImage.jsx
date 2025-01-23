import React, { useState } from "react";
import { uploadFile } from "../../../api/profile/ProfileAPI";

const ProfileImage = ({ profileImage, setProfileImage }) => {
  const [uploading, setUploading] = useState(false);

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }

    try {
      setUploading(true);

      const responseMessage = await uploadFile(file, "PROFILE_IMAGE");
      alert(responseMessage); 

      const uploadedImageUrl = URL.createObjectURL(file); 
      setProfileImage(uploadedImageUrl);

    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
      console.error("업로드 오류:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-1/4">
      <div className="relative w-40 h-40 rounded-full border overflow-hidden shadow-lg">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        )}
        <input
          type="file"
          onChange={handleProfileImageChange}
          accept="image/jpeg, image/png"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="px-1 py-0.5 bg-indigo-600 text-white text-xs rounded-md shadow-md hover:bg-indigo-700 active:bg-indigo-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          이미지 변경
        </button>
      </div>
      {uploading && (
        <div className="mt-2 text-sm text-gray-500">이미지 업로드 중...</div>
      )}
    </div>
  );
};

export default ProfileImage;
