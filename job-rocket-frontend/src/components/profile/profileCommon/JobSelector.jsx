import React, { useState, useEffect } from "react";

const JobSelector = ({ selectedJob, onJobSelect }) => {
  const [job, setJob] = useState(selectedJob); 
  const [customJob, setCustomJob] = useState("");

  const handleJobChange = (e) => {
    const value = e.target.value;
    setJob(value);
    onJobSelect(value); 
    if (value !== "custom") {
      setCustomJob("");
    }
  };

  const handleCustomJobChange = (e) => setCustomJob(e.target.value);

  useEffect(() => {
    setJob(selectedJob);
  }, [selectedJob]); 

  return (
    <div className="w-full">
      <label htmlFor="job" className="block text-sm font-medium text-gray-700">
        직업 선택
      </label>
      <select
        id="job"
        value={job}
        onChange={handleJobChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">직업을 선택하세요</option>
        <option value="학생">학생</option>
        <option value="군인">군인</option>
        <option value="취업준비생">취업준비생</option>
        <option value="백엔드 개발자">백엔드 개발자</option>
        <option value="프론트엔드 개발자">프론트엔드 개발자</option>
        <option value="기획">기획</option>
        <option value="BE 소프트웨어 엔지니어">BE 소프트웨어 엔지니어</option>
        <option value="풀스택 개발자">풀스택 개발자</option>
        <option value="서버 개발자">서버 개발자</option>
        <option value="서비스 기획자">서비스 기획자</option>
        <option value="custom">직접 입력</option>
      </select>

      {job === "custom" && (
        <div className="mt-4">
          <label htmlFor="customJob" className="block text-sm font-medium text-gray-700">
            직접 입력
          </label>
          <input
            type="text"
            id="customJob"
            value={customJob}
            onChange={handleCustomJobChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="직업을 입력하세요"
          />
        </div>
      )}
    </div>
  );
};

export default JobSelector;
