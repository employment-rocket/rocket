import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { getPublicProfileById } from "../../../api/profile/ProfileAPI";
import CareerSection from "../../career/CareerSection";
// import CardUserDetail2 from "./CadrUserDetail2";

const CardUserDetail = ({ onThemeChange }) => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const profileRef = useRef();
  const sectionRefs = useRef({});
  const [theme, setTheme] = useState(1);

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

  const filteredSections = sections.filter(
    (section) => section.name !== "PROFILE_IMAGE" && section.visible
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getPublicProfileById(memberId);
        if (response) {
          setProfile(response);

          const excludedSections = [
            "BASICINFO",
            "TAGSSELECTION",
            "INTERESTFIELD",
          ];
          const formattedSections = response.sections.map((section, index) => ({
            name: section.type,
            label: sectionLabels[section.type] || section.type,
            visible: !excludedSections.includes(section.type),
            order: index,
          }));
          setSections(formattedSections);

          formattedSections.forEach((section) => {
            sectionRefs.current[section.name] = React.createRef();
          });
        } else {
          console.error("사용자 정보를 찾을 수 없습니다.");
          setProfile(null);
        }
      } catch (error) {
        console.error(
          "사용자 데이터를 가져오는 데 실패했습니다:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [memberId]);

  const scrollToSection = (sectionName) => {
    const ref = sectionRefs.current[sectionName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (theme === 2) {
    return <CardUserDetail2 setTheme={setTheme} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-500">
        사용자 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full px-4 space-y-4">
      <div className="flex flex-row w-full max-w-6xl items-start justify-between">
        <div className="flex flex-col w-3/4 max-w-4xl py-8 px-6 bg-white shadow-md rounded-lg">
          <CareerSection
            profile={profile}
            sections={filteredSections}
            profileRef={profileRef}
            sectionRefs={sectionRefs}
          />
        </div>

        <div className="flex flex-col sticky top-4 ml-6 w-1/5 bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col space-y-2 mb-4">
            <button
              className="text-sm px-3 py-2 rounded-md bg-gray-100 text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-200 hover:text-gray-800 transition"
              onClick={() => navigate("/talent")}
            >
              뒤로가기
            </button>
            <button
              className="text-sm px-3 py-2 rounded-md bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition"
              onClick={() => alert("쪽지 보내기 기능은 준비 중입니다.")}
            >
              쪽지 보내기
            </button>
            <button
              className="text-sm px-3 py-2 rounded-md bg-green-500 text-white shadow-sm hover:bg-green-600 transition"
              onClick={() => setTheme(2)}
            >
              테마 변경
            </button>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">섹션 이동</h3>
          <ul className="space-y-3">
            <li>
              <button
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white transition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                프로필
              </button>
            </li>
            {filteredSections.map((section) => (
              <li key={section.name}>
                <button
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white transition"
                  onClick={() => scrollToSection(section.name)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardUserDetail;
