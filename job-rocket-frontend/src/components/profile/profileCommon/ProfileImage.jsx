import React from "react";

const ProfileImage = ({ profileImage, setProfileImage }) => {
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result); 
      reader.readAsDataURL(file); 
    } else {
      alert("파일은 jpg, jpeg, png 형식이어야 하며, 크기는 5MB 이하여야 합니다.");
    }
  };

  const handleImageDelete = () => setProfileImage(null); 

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
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      {profileImage ? (
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="px-1 py-0.5 bg-indigo-600 text-white text-xs rounded-md shadow-md hover:bg-indigo-700 active:bg-indigo-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            이미지 변경
          </button>
          <button
            onClick={handleImageDelete}
            className="px-1 py-0.5 bg-red-600 text-white text-xs rounded-md shadow-md hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-400 focus:outline-none"
          >
            이미지 삭제
          </button>
        </div>
      ) : (
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="mt-4 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md shadow-md hover:bg-indigo-700 active:bg-indigo-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          이미지 등록
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
