import React, { useEffect, useState } from "react";

const RelatedJobs = ({ interestField, selectedRoles, setSelectedRoles }) => {
  const [developerRoleOptions, setDeveloperRoleOptions] = useState([]);

  useEffect(() => {
    const roleOptions = {
      개발: [
        "백엔드 / 서버 개발자",
        "프론트엔드 / 웹퍼블리셔",
        "SW 엔지니어",
        "안드로이드 개발자",
        "iOS 개발자",
        "크로스플랫폼 앱 개발자",
        "데이터 엔지니어",
        "데이터 분석가",
        "머신러닝 엔지니어",
        "DBA",
      ],
      "게임 개발": [
        "게임 서버 개발자",
        "게임 클라이언트 개발자",
        "게임 기획자",
        "모바일 게임 개발자",
        "게임 그래픽 디자이너",
        "게임 아티스트",
      ],
      기획: [
        "서비스 기획자",
        "PO/PM",
        "비즈니스 분석가",
        "사업개발/기획자",
        "전략 기획자",
        "해외 사업개발/기획자",
      ],
      마케팅: [
        "퍼포먼스 마케터",
        "콘텐츠 마케터",
        "디지털 마케터",
        "마케팅 기획자",
        "브랜드 마케터",
        "광고 기획자",
        "CRM 전문가",
        "카피라이터/UX Writer",
      ],
    };

    setDeveloperRoleOptions(roleOptions[interestField] || []);
  }, [interestField]);

  const handleDeveloperRoleClick = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else if (selectedRoles.length < 5) {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-4">관련 직업 선택</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {developerRoleOptions.map((role) => (
          <button
            key={role}
            type="button"
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              selectedRoles.includes(role)
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-100"
            }`}
            onClick={() => handleDeveloperRoleClick(role)}
          >
        
            {role}
          </button>
        ))}
      </div>
      {selectedRoles.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">선택된 직업:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRoles.map((role) => (
              <button
                key={role}
                className="px-3 py-1 rounded-full bg-indigo-500 text-white text-sm font-medium"
                onClick={() => handleDeveloperRoleClick(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedJobs;
