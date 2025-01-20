import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const ExperienceView = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const profileData = await getProfile();
        const experienceSection = profileData.sections.find(
          (section) => section.type === "EXPERIENCE"
        );

        if (experienceSection?.data.experiences?.length > 0) {
          setExperiences(experienceSection.data.experiences);
        } else {
          setExperiences([]);
        }
      } catch (error) {
        console.error("경력 정보 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">


      {experiences.length > 0 ? (
        <ul className="space-y-6 text-left">
          {experiences.map((experience, index) => (
            <li key={experience.id} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-md font-semibold text-gray-800">
                {experience.companyName}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>직책/부서: </strong>
                {experience.position} - {experience.department}
              </p>
              <p className="text-sm text-gray-500">
                <strong>근무 기간: </strong>
                {experience.startDate} ~{" "}
                {experience.isCurrentlyWorking ? "현재" : experience.endDate}
              </p>
              <p className="text-sm text-gray-500 whitespace-pre-wrap mt-2">
                <strong>주요 업무: </strong>
                {experience.tasks}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-left">저장된 경력 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default ExperienceView;
