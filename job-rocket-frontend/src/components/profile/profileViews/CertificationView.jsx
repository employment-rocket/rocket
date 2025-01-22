import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const CertificationView = () => {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const fetchedProfile = await getProfile();
        const certificationSection = fetchedProfile.sections.find(
          (section) => section.type === "CERTIFICATION"
        );

        if (certificationSection?.data.certifications?.length > 0) {
          setCertifications(certificationSection.data.certifications);
        } else {
          setCertifications([]);
        }
      } catch (error) {
        console.error("자격증 데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (isLoading) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
 

      {certifications.length > 0 ? (
        <ul className="space-y-6 border-l-4 border-blue-500 pl-4">
          {certifications.map((cert, index) => (
            <li
              key={index}
              className="  text-left"
            >
              <h3 className="text-md font-semibold text-gray-800">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-600">
                발급 기관: {cert.issuingInstitution}
              </p>
              <p className="text-sm text-gray-500">
                취득 날짜: {cert.acquisitionDate}
              </p>
              {cert.scoreOrGrade && (
                <p className="text-sm text-gray-500">
                  점수/등급: {cert.scoreOrGrade}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-left">저장된 자격증 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default CertificationView;
