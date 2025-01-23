import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import LanguageItem from "./../profileCommon/LanguageItem";

const LanguageForm = ({ order, onSave }) => {
  const [languages, setLanguages] = useState([]);
  const [hasSavedLanguages, setHasSavedLanguages] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        const languageSection = fetchedProfile.sections.find(
          (section) => section.type === "LANGUAGES"
        );

        if (languageSection?.data.languages?.length > 0) {
          setLanguages(languageSection.data.languages);
          setHasSavedLanguages(true); 
        } else {
          setLanguages([]);
          setHasSavedLanguages(false); 
        }
      } catch (error) {
        console.error("프로필 조회 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      {
        id: Date.now(),
        language: "",
        level: "",
      },
    ]);
  };

  const handleRemoveLanguage = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const handleLanguageChange = (id, field, value) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const handleSaveLanguages = async () => {
    const profileData = {
      type: "LANGUAGES",
      data: { languages },
      order,
    };

    try {
      await addProfile(profileData);
      alert("외국어 정보가 성공적으로 저장되었습니다!");
      setHasSavedLanguages(true); 
      onSave && onSave("languages", true);
    } catch (error) {
      console.error("외국어 저장 실패:", error);
      alert("외국어 저장 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateLanguages = async () => {
    const profileData = {
      type: "LANGUAGES",
      data: { languages },
      order,
    };

    try {
      await updateProfile(profileData);
      alert("외국어 정보가 성공적으로 수정되었습니다!");
      onSave && onSave("languages", true);
    } catch (error) {
      console.error("외국어 수정 실패:", error);
      alert("외국어 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">외국어</h2>
        <button
          className={`px-2 py-1 rounded-md text-sm ${
            languages.length < 8
              ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }`}
          onClick={handleAddLanguage}
          disabled={languages.length >= 8}
        >
          + 외국어 추가
        </button>
      </div>

      {languages.map((language, index) => (
        <LanguageItem
          key={language.id}
          language={language}
          index={index}
          onChange={handleLanguageChange}
          onRemove={handleRemoveLanguage}
          languagesLength={languages.length}
        />
      ))}

      <div className="flex justify-end space-x-4 mt-4">
        {!hasSavedLanguages ? (
          <button
            onClick={handleSaveLanguages}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        ) : (
          <button
            onClick={handleUpdateLanguages}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguageForm;
