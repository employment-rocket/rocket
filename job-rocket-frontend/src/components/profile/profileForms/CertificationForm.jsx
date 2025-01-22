import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import CertificationItem from "./../profileCommon/CertificationItem";

const CertificationForm = ({ order, onSave }) => {
  const [certifications, setCertifications] = useState([]);
  const [hasSavedCertifications, setHasSavedCertifications] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        const certificationSection = fetchedProfile.sections.find(
          (section) => section.type === "CERTIFICATION"
        );

        if (certificationSection?.data.certifications?.length > 0) {
          setCertifications(certificationSection.data.certifications);
          setHasSavedCertifications(true);
        } else {
          setCertifications([]);
          setHasSavedCertifications(false);
        }
      } catch (error) {
        console.error("자격증 데이터 가져오기 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      {
        id: Date.now(),
        name: "",
        scoreOrGrade: "",
        acquisitionDate: "",
        issuingInstitution: "",
      },
    ]);
  };

  const handleRemoveCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const handleCertificationChange = (id, field, value) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const handleSaveCertifications = async () => {
    const profileData = {
      type: "CERTIFICATION",
      data: { certifications },
      order,
    };

    try {
      await addProfile(profileData);
      alert("자격증 정보가 성공적으로 저장되었습니다!");
      setHasSavedCertifications(true);
      onSave && onSave("certification", true);
    } catch (error) {
      console.error("자격증 저장 실패:", error);
      alert("자격증 저장 중 문제가 발생했습니다.");
    }
  };

  const handleUpdateCertifications = async () => {
    const profileData = {
      type: "CERTIFICATION",
      data: { certifications },
      order,
    };

    try {
      await updateProfile(profileData);
      alert("자격증 정보가 성공적으로 수정되었습니다!");
      onSave && onSave("certification", true);
    } catch (error) {
      console.error("자격증 수정 실패:", error);
      alert("자격증 수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">자격증</h2>

      {certifications.map((cert, index) => (
        <CertificationItem
          key={cert.id}
          cert={cert}
          index={index}
          onChange={handleCertificationChange}
          onRemove={handleRemoveCertification}
        />
      ))}

      <button
        className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100"
        onClick={handleAddCertification}
      >
        + 자격증 추가
      </button>

      <div className="flex justify-end space-x-4 mt-4">
        {!hasSavedCertifications ? (
          <button
            onClick={handleSaveCertifications}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        ) : (
          <button
            onClick={handleUpdateCertifications}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificationForm;
