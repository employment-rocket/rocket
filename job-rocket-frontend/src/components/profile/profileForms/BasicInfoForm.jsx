import React from "react";
import InputField from "./../profileCommon/InputField";
import JobSelector from "./../profileCommon/JobSelector";
import AddressSearch from "./../profileCommon/AddressSearch";
import ProfileImage from "../profileCommon/ProfileImage";

const BasicInfoForm = ({
  profile,
  handleChange,
  setJob,
  setAddress,
  setProfileImage,
  setStatus,
}) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-semibold">프로필 정보</h2>

        <InputField
          label="이름"
          value={profile?.name}
          name="name"
          handleChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <JobSelector selectedJob={profile?.job} onJobSelect={setJob} />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              구직 상태
            </label>
            <select
              id="status"
              value={profile?.status || "default"}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="default">선택</option>
              <option value="(신입) 구직 중이에요">(신입) 구직 중이에요</option>
              <option value="(경력) 이직/구직 중이에요">(경력) 이직/구직 중이에요</option>
              <option value="피드백 원해요">피드백 원해요</option>
              <option value="신부감 원해요">신부감 원해요</option>
            </select>
          </div>
        </div>

        {profile?.status !== "(신입) 구직 중이에요" && profile?.status !== "default" && (
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="경력 년차"
              value={profile?.yearsOfExperience || ""}
              name="yearsOfExperience"
              handleChange={handleChange}
            />
            <InputField
              label="현재 회사명"
              value={profile?.currentCompany || ""}
              name="currentCompany"
              handleChange={handleChange}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="휴대폰 번호"
            value={profile?.phoneNumber || ""}
            name="phoneNumber"
            handleChange={handleChange}
          />
          <InputField
            label="이메일"
            value={profile?.email || ""}
            name="email"
            handleChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            주소
          </label>
          <AddressSearch
            setAddress={setAddress}
            address={profile?.address || "주소 없음"}
          />
        </div>

        <div>
          <label
            htmlFor="introduction"
            className="block text-sm font-medium text-gray-700"
          >
            한줄 소개
          </label>
          <textarea
            id="introduction"
            value={profile?.shortIntroduction || ""}
            onChange={handleChange}
            name="shortIntroduction"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
            rows={3}
            placeholder="채용 담당자에게 특별한 인상을 줄 수 있는 소개를 작성해 보세요."
          />
          <p className="mt-1 text-sm text-gray-500">300자 이내</p>
        </div>
      </div>
      
      <ProfileImage
        profileImage={profile?.profileImage}
        setProfileImage={setProfileImage}
      />

    </div>
  );
};

export default BasicInfoForm;
