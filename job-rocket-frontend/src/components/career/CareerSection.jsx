import React from "react";
import ProfileView from "../profile/profileViews/ProfileView";
import InterestView from "../profile/profileViews/InterestView";
import TagsView from "../profile/profileViews/TagsView";
import SkillsView from "../profile/profileViews/SkillsView";
import LanguageView from "../profile/profileViews/LanguageView";
import ActivityView from "../profile/profileViews/ActivityView";
import ProjectView from "../profile/profileViews/ProjectView";
import EducationView from "../profile/profileViews/EducationView";
import SelfIntroductionView from "../profile/profileViews/SelfIntroductionView";
import PortfolioView from "../profile/profileViews/PortfolioView";
import ExperienceView from "../profile/profileViews/ExperienceView";
import CertificationView from "../profile/profileViews/CertificationView";
import logo from "../../assets/logo.png"

const CareerSection = ({ profile, sections, profileRef, sectionRefs, handleCreateProfile, isSidebarOpen }) => {
  const renderSection = (section) => {
    switch (section.name) {
      case "SKILLS":
        return <SkillsView key={section.name} />;
      case "LANGUAGES":
        return <LanguageView key={section.name} />;
      case "ACTIVITY":
        return <ActivityView key={section.name} />;
      case "PROJECT":
        return <ProjectView key={section.name} />;
      case "EDUCATION":
        return <EducationView key={section.name} />;
      case "SELFINTRO":
        return <SelfIntroductionView key={section.name} />;
      case "PORTFOLIO":
        return <PortfolioView key={section.name} />;
      case "EXPERIENCE":
        return <ExperienceView key={section.name} />;
      case "CERTIFICATION":
        return <CertificationView key={section.name} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${isSidebarOpen ? "w-3/4" : "w-full"
        } bg-white rounded-lg shadow-lg p-10 space-y-12`}
    >
      {profile && Object.keys(profile).length > 0 ? (
        <div ref={profileRef} className="space-y-16">
       
          <div className="border-b pb-8">

            <ProfileView />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-4">관심 분야</h3>
              <InterestView />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-4">저장된 태그</h3>
              <TagsView />
            </div>
          </div>

          <div className="space-y-12">
            {sections
              .filter((section) => section.visible)
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div
                  key={section.name}
                  ref={sectionRefs.current[section.name]} 
                  className="bg-gray-50 p-6 rounded-lg shadow"
                >
                  <h3 className="text-xl font-bold mb-4">{section.label}</h3>
                  {renderSection(section)}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center max-w-3xl mx-auto p-8"> 
        <img
          src={logo}
          alt="Logo"
          className="mx-auto w-40 h-40 mb-8" 
        />
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">작성된 프로필이 없습니다.</h2> 
        <button
          onClick={handleCreateProfile}
          className="bg-blue-500 text-white px-8 py-4 rounded-xl text-2xl hover:bg-blue-600 transition"
        >
          프로필 작성하기
        </button>
      </div>
      )}
    </div>
  );
};

export default CareerSection;
