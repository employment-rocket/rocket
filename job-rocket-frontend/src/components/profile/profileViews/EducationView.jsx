import React, { useEffect, useState } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const EducationView = () => {
  const [educations, setEducations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const fetchedProfile = await getProfile();
        const educationSection = fetchedProfile.sections.find(
          (section) => section.type === "EDUCATION"
        );

        if (educationSection?.data.educations?.length > 0) {
          setEducations(educationSection.data.educations);
        } else {
          setEducations([]);
        }
      } catch (error) {
        console.error("교육 데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducations();
  }, []);

  if (isLoading) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
  

      {educations.length > 0 ? (
        <ul className="space-y-6 text-left">
          {educations.map((education) => (
            <li
              key={education.id}
              className="border-l-4 border-blue-500 pl-4"
            >
              <h3 className="text-md font-semibold text-gray-800">
                {education.organization}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>학위/전공: </strong>
                {education.type} - {education.major}
              </p>
              <p className="text-sm text-gray-500">
                <strong>재학 기간: </strong>
                {education.period.start} ~ {education.period.end || "현재"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>상태: </strong>
                {education.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-left">저장된 교육 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default EducationView;
