import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const TagsView = () => {
  const [tags, setTags] = useState([]);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

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
          }
        }
        setIsProfileLoaded(true);
      } catch (error) {
        console.error("프로필 조회 실패:", error);
        setIsProfileLoaded(true);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      {isProfileLoaded ? (
        tags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">저장된 태그가 없습니다.</p>
        )
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default TagsView;
