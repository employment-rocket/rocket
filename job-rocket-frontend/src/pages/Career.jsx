import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import ProfileCategory from "../components/profile/ProfileCategory";
import CareerSection from "../components/career/CareerSection";
import CareerMenuSection from "../components/career/careerCommon/CareerMenuSection";
import { getProfile } from "../api/profile/ProfileAPI";
import PDFPanelSection from "../components/career/pdf/PDFPanelSection";

const Career = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileRef = useRef();
  const pdfPanelRef = useRef();
  const sectionRefs = useRef({});

  const sectionLabels = {
    SKILLS: "기술 스택",
    LANGUAGES: "언어",
    ACTIVITY: "대외활동",
    PROJECT: "프로젝트",
    EDUCATION: "교육",
    SELFINTRO: "자기소개",
    PORTFOLIO: "포트폴리오",
    EXPERIENCE: "경력",
    CERTIFICATION: "자격증",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        if (response) {
          const excludedSections = ["BASICINFO", "TAGSSELECTION", "INTERESTFIELD"];
          const formattedSections = response.sections
            .filter((section) => !excludedSections.includes(section.type))
            .map((section) => ({
              name: section.type,
              label: sectionLabels[section.type] || section.type,
              visible: true,
              order: section.order,
            }))
            .sort((a, b) => a.order - b.order);

          setProfile(response);
          setSections(formattedSections);

          formattedSections.forEach((section) => {
            sectionRefs.current[section.name] = React.createRef();
          });
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSidebarToggle = async () => {
    setIsSidebarOpen((prev) => !prev);
    if (!isSidebarOpen && pdfPanelRef.current) {
      await pdfPanelRef.current.generatePDF();
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleCreateProfile = () => {
    navigate("/profile");
  };

  const scrollToSection = (sectionName) => {
    const ref = sectionRefs.current[sectionName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <ProfileCategory />
      <div
        className={`flex items-stretch flex-row w-full min-h-[calc(100vh-4rem)] py-10 px-4 gap-6 transition-all duration-300 ${isSidebarOpen ? "justify-start" : "justify-center"
          }`}
      >
        <div className={`flex w-full max-w-6xl h-full gap-4 ${isSidebarOpen ? "ml-4" : "mx-auto"}`}>
          <div className="flex flex-row w-full h-auto">
            <div className="w-3/4">
              <CareerSection
                profile={profile}
                sections={sections}
                profileRef={profileRef}
                sectionRefs={sectionRefs}
                handleCreateProfile={handleCreateProfile}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
            {profile && (
              <div className="w-1/4">
                <CareerMenuSection
                  handleSidebarToggle={handleSidebarToggle}
                  sections={sections}
                  scrollToSection={scrollToSection}
                />
              </div>
            )}
          </div>
        </div>

        <PDFPanelSection
          profile={profile}
          isSidebarOpen={isSidebarOpen}
          pdfPanelRef={pdfPanelRef}
          profileRef={profileRef}
          sections={sections}
          setSections={setSections}
          onClose={handleCloseSidebar}
        />
      </div>
    </div>
  );
};

export default Career;
