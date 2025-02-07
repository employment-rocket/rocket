import React from "react";
import { useNavigate } from "react-router";

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();
  const { memberId, name, job, shortIntroduction, profileImage, tags, status, yearsOfExperience, currentCompany } =
    profile;

  const handleCardClick = () => {
    navigate(`/card/${memberId}`);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
      style={{ width: "200px", height: "320px" }}
      onClick={handleCardClick}
    >
      <div
        className="w-full h-1/2 bg-gray-100 relative"
        style={{ height: "50%" }}
      >
        <img
          src={profileImage || "https://via.placeholder.com/200"}
          alt={name || "프로필 이미지"}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full text-white px-3 py-1 bg-black bg-opacity-50 flex items-center justify-between">
          <div className="text-[10px] font-bold">{status || "구직 상태 없음"}</div>
          <div
            className="bg-black bg-opacity-70 text-white p-1 rounded-full cursor-pointer hover:bg-opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              alert("쪽지 보내기 기능은 준비 중입니다.");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 50 50"
            >
              <path d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 13 16 L 37 16 C 37.18 16 37.349766 16.020312 37.509766 16.070312 L 27.679688 25.890625 C 26.199688 27.370625 23.790547 27.370625 22.310547 25.890625 L 12.490234 16.070312 C 12.650234 16.020312 12.82 16 13 16 z M 11.070312 17.490234 L 18.589844 25 L 11.070312 32.509766 C 11.020312 32.349766 11 32.18 11 32 L 11 18 C 11 17.82 11.020312 17.650234 11.070312 17.490234 z M 38.929688 17.490234 C 38.979688 17.650234 39 17.82 39 18 L 39 32 C 39 32.18 38.979687 32.349766 38.929688 32.509766 L 31.400391 25 L 38.929688 17.490234 z M 20 26.410156 L 20.890625 27.310547 C 22.020625 28.440547 23.510234 29 24.990234 29 C 26.480234 29 27.959844 28.440547 29.089844 27.310547 L 29.990234 26.410156 L 37.509766 33.929688 C 37.349766 33.979688 37.18 34 37 34 L 13 34 C 12.82 34 12.650234 33.979687 12.490234 33.929688 L 20 26.410156 z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full h-1/2 p-2 flex flex-col justify-between">
        <div>
          <h2 className="text-md font-semibold text-gray-800 truncate">{job || "직업 정보 없음"}</h2>
          <p className="text-[12px] text-gray-500 mt-1">
            {yearsOfExperience && currentCompany
              ? `${yearsOfExperience}년차 • ${currentCompany}`
              : "신입"}
          </p>
        </div>
        <p className="text-[10px] text-gray-600 -mt-2 line-clamp-4">
          {shortIntroduction || "소개 정보 없음"}
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-[9px] bg-gray-100 text-gray-600 border border-gray-300 rounded-full px-1 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
