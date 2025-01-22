import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";

const TagsSelection = () => {
  const [tags, setTags] = useState([]); 
  const [profile, setProfile] = useState(null);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); 
  const [hasSavedTags, setHasSavedTags] = useState(false); 

  const allTags = [
    "혁신적", "창의적", "성실함", "책임감", "협력 지향", "유연함",
    "분석적", "목표 지향적", "꼼꼼함", "학습 지향", "효율적", "전략적",
    "커뮤니케이션", "기술적", "비전 지향", "자기 주도적", "문제 해결사", "고객 중심",
    "신뢰", "열정적", "긍정적", "적응력", "리더십", "참을성",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        if (fetchedProfile) {
          const tagsSection = fetchedProfile.sections.find(
            (section) => section.type === "TAGSSELECTION"
          );
          if (tagsSection) {
            setTags(tagsSection.data.tags || []);
            setHasSavedTags(true); 
          } else {
            setHasSavedTags(false); 
          }
        }
        setProfile(fetchedProfile);
        setIsProfileLoaded(true);
      } catch (error) {
      
        setIsProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else if (tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  const handleSave = async () => {
    const profileData = {
      type: "TAGSSELECTION",
      data: {
        tags,
      },
      order: 3,
    };

    try {
      await addProfile(profileData);
      const updatedProfile = await getProfile();
      setProfile(updatedProfile);
      setHasSavedTags(true); 
      setIsProfileLoaded(true);
      alert("태그가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("태그 저장 실패:", error);
      alert("태그 저장 중 오류가 발생했습니다.");
    }
  };

  const handleUpdate = async () => {
    const profileData = {
      type: "TAGSSELECTION",
      data: {
        tags,
      },
      order: 3,
    };

    try {
      await updateProfile(profileData);
      const updatedProfile = await getProfile();
      setProfile(updatedProfile);
      setHasSavedTags(true); 
      setIsProfileLoaded(true);
      alert("태그가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("태그 수정 실패:", error);
      alert("태그 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">나를 표현하는 태그 (최대 5개)</h2>
        {isProfileLoaded ? (
          hasSavedTags ? (
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

  
      <div className="flex flex-wrap gap-3">
        
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              tags.includes(tag)
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-100"
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {tags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-gray-700">선택된 태그:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 rounded-full bg-indigo-500 text-white text-sm font-medium"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsSelection;
