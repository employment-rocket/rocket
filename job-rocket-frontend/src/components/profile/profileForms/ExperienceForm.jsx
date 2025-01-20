import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import ExperienceItem from "./../profileCommon/ExperienceItem";

const ExperienceForm = ({ order, onSave }) => {
  const [experienceForms, setExperienceForms] = useState([]);
  const [hasSavedExperiences, setHasSavedExperiences] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        const experienceSection = fetchedProfile.sections.find(
          (section) => section.type === "EXPERIENCE"
        );

        if (experienceSection?.data.experiences?.length > 0) {
          setExperienceForms(experienceSection.data.experiences);
          setHasSavedExperiences(true); 
        } else {
          setExperienceForms([]);
          setHasSavedExperiences(false); 
        }
      } catch (error) {
        console.error("프로필 조회 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAddExperienceClick = () => {
    setExperienceForms([
      ...experienceForms,
      {
        id: Date.now(),
        companyName: "",
        position: "",
        department: "",
        tasks: "",
        startDate: "",
        endDate: "",
        isCurrentlyWorking: false,
      },
    ]);
  };

  const handleRemoveExperience = (id) => {
    setExperienceForms(experienceForms.filter((form) => form.id !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperienceForms(
      experienceForms.map((form) =>
        form.id === id ? { ...form, [field]: value } : form
      )
    );
  };

  const handleSaveOrUpdate = async () => {
    const profileData = {
      type: "EXPERIENCE",
      data: { experiences: experienceForms },
      order,
    };

    try {
      if (hasSavedExperiences) {
        await updateProfile(profileData);
        alert("경력 정보가 성공적으로 수정되었습니다.");
      } else {
        await addProfile(profileData);
        alert("경력 정보가 성공적으로 저장되었습니다.");
        setHasSavedExperiences(true); 
      }
      onSave && onSave("experience", true);
    } catch (error) {
      console.error("경력 정보 저장/수정 실패:", error);
      alert("경력 정보 저장/수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          경력 <span className="text-sm text-gray-500">(최대 30개)</span>
        </h2>
        <button
          className="text-gray-600 font-bold hover:underline"
          onClick={handleAddExperienceClick}
        >
          + 경력 추가
        </button>
      </div>
      <hr className="border-gray-300 my-2" />

      {experienceForms.map((form, index) => (
        <ExperienceItem
          key={form.id}
          experience={form}
          index={index}
          onChange={handleExperienceChange}
          onRemove={handleRemoveExperience}
        />
      ))}

      <div className="flex justify-end space-x-4 mt-4">
        {!hasSavedExperiences ? (
          <button
            onClick={handleSaveOrUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        ) : (
          <button
            onClick={handleSaveOrUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
