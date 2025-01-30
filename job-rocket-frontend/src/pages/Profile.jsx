import React, { useState, useEffect } from "react";
import { getProfile } from "../api/profile/ProfileAPI";
import SkillsSelectionForm from "../components/profile/profileForms/SkillsSelectionForm";
import ExperienceForm from "../components/profile/profileForms/ExperienceForm";
import ProjectForm from "../components/profile/profileForms/ProjectForm";
import PortfolioForm from "../components/profile/profileForms/PortfolioForm";
import EducationForm from "../components/profile/profileForms/EducationForm";
import ActivityForm from "../components/profile/profileForms/ActivityForm";
import CertificationForm from "../components/profile/profileForms/CertificationForm";
import LanguageForm from "../components/profile/profileForms/LanguageForm";
import SelfIntroductionForm from "../components/profile/profileForms/SelfIntroductionForm";
import BasicInfo from "../components/Profile/profileCommon/BasicInfo";
import InterestField from "../components/profile/profileCommon/InterestField";
import TagsSelection from "../components/profile/profileCommon/TagsSelection";
import Sidebar from "../components/profile/profileLayout/Sidebar";
import ProfileCategory from "../components/profile/ProfileCategory";

const Profile = () => {
  const [tags, setTags] = useState([]);
  const [interestField, setInterestField] = useState("전체");
  const [developerRoles, setDeveloperRoles] = useState([]);
  const [forms, setForms] = useState([
    { key: "SKILLS", label: "기술 스택", component: <SkillsSelectionForm />, icon: "💻", active: false },
    { key: "EXPERIENCE", label: "경력", component: <ExperienceForm />, icon: "💼", active: false },
    { key: "PROJECT", label: "프로젝트", component: <ProjectForm />, icon: "📋", active: false },
    { key: "PORTFOLIO", label: "포트폴리오", component: <PortfolioForm />, icon: "📁", active: false },
    { key: "EDUCATION", label: "교육", component: <EducationForm />, icon: "🎓", active: false },
    { key: "ACTIVITY", label: "대외활동", component: <ActivityForm />, icon: "🏆", active: false },
    { key: "CERTIFICATION", label: "자격증", component: <CertificationForm />, icon: "📜", active: false },
    { key: "LANGUAGES", label: "외국어", component: <LanguageForm />, icon: "🌐", active: false },
    { key: "SELFINTRO", label: "자기소개", component: <SelfIntroductionForm />, icon: "💬", active: false },
  ]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        const updatedForms = forms.map((form) => {
          const serverSection = profileData.sections.find(
            (section) => section.type === form.key
          );
          return serverSection
            ? { ...form, active: true, order: serverSection.order }
            : { ...form, active: false };
        });
    
        updatedForms.sort((a, b) => (a.order || 0) - (b.order || 0));
        setForms(updatedForms);
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", error.message);
      }
    };

    fetchProfile();
  }, []);

  const activeForms = forms
    .filter((form) => form.active)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const updateSection = (key, isActive) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.key === key ? { ...form, active: isActive } : form
      )
    );
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <ProfileCategory />
      <div className="max-w-[1300px] mx-auto p-6 flex flex-row space-x-6">


        <div className="flex-1 space-y-6">
          <BasicInfo />
          <InterestField
            interestField={interestField}
            setInterestField={setInterestField}
            developerRoles={developerRoles}
            setDeveloperRoles={setDeveloperRoles}
          />
          <TagsSelection tags={tags} setTags={setTags} />
          {activeForms.map((item) => (
            <div key={item.key} className="transition-all duration-300 ease-in-out transform scale-100">
              {React.cloneElement(item.component, {
                order: item.order,
                onSave: (key, isActive) => updateSection(key, isActive),
              })}
            </div>
          ))}
        </div>
        <div className="w-1/4">
          <Sidebar
            forms={forms}
            setForms={setForms}
            toggleForm={(key) =>
              updateSection(key, !forms.find((form) => form.key === key)?.active)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;