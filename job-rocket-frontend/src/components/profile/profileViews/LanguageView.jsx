import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI"; 
import LanguageItem from "../profileCommon/LanguageItem";

const LanguageView = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const fetchedProfile = await getProfile();
        const languageSection = fetchedProfile.sections.find(
          (section) => section.type === "LANGUAGES"
        );

        if (languageSection?.data.languages?.length > 0) {
      
          const sortedLanguages = languageSection.data.languages.sort((a, b) => a.order - b.order);
          setLanguages(sortedLanguages);
        }
      } catch (error) {
        console.error("프로필 조회 실패:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-6xl mx-auto space-y-6 text-left">
      
      {languages.length > 0 ? (
        languages.map((language, index) => (
          <LanguageItem
            key={language.id}
            language={language}
            index={index}
            onChange={() => {}}
            onRemove={() => {}}
            languagesLength={languages.length}
            readonly={true} 
          />
        ))
      ) : (
        <p>저장된 외국어 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default LanguageView;
