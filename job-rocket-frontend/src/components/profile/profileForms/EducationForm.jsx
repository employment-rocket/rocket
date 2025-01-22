import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import EducationItem from "./../profileCommon/EducationItem";

const EducationForm = ({ order, onSave }) => {
  const [educations, setEducations] = useState([]);
  const [hasSavedEducations, setHasSavedEducations] = useState(false);

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        const educationSection = fetchedProfile.sections.find(
          (section) => section.type === "EDUCATION"
        );

        if (educationSection?.data.educations?.length > 0) {
          setEducations(educationSection.data.educations);
          setHasSavedEducations(true);
        } else {
          setEducations([]);
          setHasSavedEducations(false);
        }
      } catch (error) {
        console.error("교육 데이터 가져오기 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now(),
        type: "",
        organization: "",
        major: "",
        status: "",
        period: { start: "", end: "" },
      },
    ]);
  };

  const handleRemoveEducation = (id) => {
    setEducations(educations.filter((education) => education.id !== id));
  };

  const handleEducationChange = (id, field, value) => {
    setEducations(
      educations.map((education) =>
        education.id === id ? { ...education, [field]: value } : education
      )
    );
  };

  const handlePeriodChange = (id, field, value) => {
    setEducations(
      educations.map((education) =>
        education.id === id
          ? { ...education, period: { ...education.period, [field]: value } }
          : education
      )
    );
  };

  const handleSaveOrUpdate = async () => {
    const profileData = {
      type: "EDUCATION",
      data: { educations },
      order,
    };

    try {
      if (educations.length > 0) {
        await updateProfile(profileData);
        alert("교육 정보가 성공적으로 수정되었습니다.");
      } else {
        await addProfile(profileData);
        alert("교육 정보가 성공적으로 저장되었습니다.");
      }
      onSave && onSave("education", true);
    } catch (error) {
      console.error("교육 정보 저장/수정 실패:", error);
      alert("교육 정보 저장/수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">교육</h2>

      {educations.map((education, index) => (
        <EducationItem
          key={education.id}
          education={education}
          index={index}
          onChange={handleEducationChange}
          onPeriodChange={handlePeriodChange}
          onRemove={handleRemoveEducation}
        />
      ))}

      {educations.length < 15 && (
        <button
          className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100"
          onClick={handleAddEducation}
        >
          + 교육 추가
        </button>
      )}

      <div className="flex justify-end space-x-4 mt-4">
        {!hasSavedEducations ? (
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

export default EducationForm;
