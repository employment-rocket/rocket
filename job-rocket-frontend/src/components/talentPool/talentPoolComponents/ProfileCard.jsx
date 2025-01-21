import React from "react";
import { useNavigate } from "react-router";

const ProfileCard = ({ profile }) => {
    const navigate = useNavigate();
    const { memberId, name, job, shortIntroduction, profileImage, selectedRoles, tags, status, yearsOfExperience, currentCompany } = profile;

    const handleCardClick = () => {
        navigate(`/public/${memberId}`);
    };

    const handleSendMessage = (e) => {
        e.stopPropagation();
        alert("추후 공개 예정입니다.");
    };

    return (
        <div
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 cursor-pointer w-60"
            onClick={handleCardClick}
        >
            <div className="relative h-36">
                <img
                    src={profileImage || "이미지 없음"}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full  text-white px-2 py-1 flex items-center justify-between">
                 
                    <div className="text-xs font-bold">
                        {status || "구직 상태 없음"}
                    </div>
                  
                    <div className="relative group">
                        <div
                            className="bg-black bg-opacity-70 text-white p-1 rounded-full cursor-pointer hover:bg-opacity-90"
                            onClick={handleSendMessage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 50 50"
                            >
                                <path d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 13 16 L 37 16 C 37.18 16 37.349766 16.020312 37.509766 16.070312 L 27.679688 25.890625 C 26.199688 27.370625 23.790547 27.370625 22.310547 25.890625 L 12.490234 16.070312 C 12.650234 16.020312 12.82 16 13 16 z M 11.070312 17.490234 L 18.589844 25 L 11.070312 32.509766 C 11.020312 32.349766 11 32.18 11 32 L 11 18 C 11 17.82 11.020312 17.650234 11.070312 17.490234 z M 38.929688 17.490234 C 38.979688 17.650234 39 17.82 39 18 L 39 32 C 39 32.18 38.979687 32.349766 38.929688 32.509766 L 31.400391 25 L 38.929688 17.490234 z M 20 26.410156 L 20.890625 27.310547 C 22.020625 28.440547 23.510234 29 24.990234 29 C 26.480234 29 27.959844 28.440547 29.089844 27.310547 L 29.990234 26.410156 L 37.509766 33.929688 C 37.349766 33.979688 37.18 34 37 34 L 13 34 C 12.82 34 12.650234 33.979687 12.490234 33.929688 L 20 26.410156 z"></path>
                            </svg>
                        </div>
                    
                        <div className="absolute top-0 -translate-y-12 right-0 bg-black text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            메시지를 보내보세요!
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-3">
                <h2 className="text-lg font-bold text-gray-800 truncate">{job}</h2>
                <p className="text-sm font-semibold text-gray-600 mt-2 line-clamp-3">
                    {yearsOfExperience && currentCompany
                        ? `${yearsOfExperience}년차 • ${currentCompany}`
                        : "신입"}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{shortIntroduction}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {tags?.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 border border-gray-300 rounded-full px-2 py-1"
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
