import React from "react";

const CertificationItem = ({ 
  cert, 
  index, 
  onChange, 
  onRemove 
}) => {
  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-sm font-semibold mb-2">자격증 {index + 1}</h3>

    
      <input
        type="text"
        placeholder="자격증명을 입력해 주세요."
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={cert.name}
        onChange={(e) => onChange(cert.id, "name", e.target.value)}
      />

    
      <input
        type="text"
        placeholder="점수/급을 입력해 주세요."
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={cert.scoreOrGrade}
        onChange={(e) => onChange(cert.id, "scoreOrGrade", e.target.value)}
      />

    
      <input
        type="month"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={cert.acquisitionDate}
        onChange={(e) => onChange(cert.id, "acquisitionDate", e.target.value)}
      />

      
      <input
        type="text"
        placeholder="발급 기관을 입력해 주세요."
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        value={cert.issuingInstitution}
        onChange={(e) => onChange(cert.id, "issuingInstitution", e.target.value)}
      />

     
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => onRemove(cert.id)}
      >
        🗑️ 삭제
      </button>
    </div>
  );
};

export default CertificationItem;
