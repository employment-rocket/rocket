import React, { useState, useEffect } from "react";
import { uploadFile, getProfile, fetchFile } from "../../../api/profile/ProfileAPI";

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const profile = await getProfile();
        const fileName = profile.sections.find(
          (section) => section.type === "PROFILE_IMAGE"
        )?.data?.profileImage;

        if (fileName) {
          const imageUrl = await fetchFile(fileName, "PROFILE_IMAGE");
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error("프로필 이미지 로드 실패:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }

    try {
      setUploading(true);
      const response = await uploadFile(file, "PROFILE_IMAGE");
      const imageUrl = await fetchFile(response.fileName, "PROFILE_IMAGE");
      setProfileImage(imageUrl);
      alert("프로필 이미지가 성공적으로 업로드되었습니다!");
    } catch (error) {
      console.error("업로드 오류:", error);
      alert("이미지 업로드에 실패했습니다.");
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
      <div className="mt-4">
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="px-2 py-1 bg-indigo-600 text-white text-sm rounded-md shadow-md hover:bg-indigo-700"
        >
          이미지 변경
        </button>
      </div>
      {uploading && <div className="mt-2 text-sm text-gray-500">이미지 업로드 중...</div>}
    </div>
  );
};

export default ProfileImage;