import React, { useState } from "react";

const LinkedCareerModal = ({ onClose }) => {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isStudentEmailVerification, setIsStudentEmailVerification] = useState(false);

  const handleVerificationModalOpen = () => {
    setIsVerificationModalOpen(true);
  };

  const handleVerificationModalClose = () => {
    setIsVerificationModalOpen(false);
    setIsStudentEmailVerification(false); // 상태 초기화
  };

  const handleStudentEmailVerification = () => {
    setIsStudentEmailVerification(true); // 학생 이메일 인증 UI 활성화
  };

  const handleRegularVerification = () => {
    setIsStudentEmailVerification(false); // 일반 인증 활성화
  };

  return (
    <>
      {/* 첫 번째 모달 */}
      {!isVerificationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">경력정보 연동</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              MY 커리어에 연동된 경력 정보가 없어요. 경력을 불러오시겠어요?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleVerificationModalOpen}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 두 번째 모달 */}
      {isVerificationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">소속 인증</h3>
              <button onClick={handleVerificationModalClose} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  인증수단
                </label>
                <div className="flex space-x-4">
                  <button
                    className="flex items-center space-x-2 px-4 py-2 border rounded-lg"
                    onClick={handleRegularVerification}
                  >
                    <img
                      src="https://via.placeholder.com/24"
                      alt="카카오"
                      className="w-6 h-6"
                    />
                    <span>카카오</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 px-4 py-2 border rounded-lg"
                    onClick={handleRegularVerification}
                  >
                    <img
                      src="https://via.placeholder.com/24"
                      alt="네이버"
                      className="w-6 h-6"
                    />
                    <span>네이버</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 px-4 py-2 border rounded-lg"
                    onClick={handleRegularVerification}
                  >
                    <img
                      src="https://via.placeholder.com/24"
                      alt="PASS"
                      className="w-6 h-6"
                    />
                    <span>PASS</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    name="verification"
                    className="mr-2"
                    onClick={handleStudentEmailVerification}
                  />
                  학생이라면, 이메일 인증
                </label>
              </div>

              {/* 일반 인증 UI */}
              {!isStudentEmailVerification && (
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="이름"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="생년월일 (YYYYMMDD)"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="휴대폰 번호"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agree"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="agree"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      [필수] 제 3자 정보 제공 동의
                    </label>
                  </div>
                </div>
              )}

              {/* 학생 이메일 인증 UI */}
              {isStudentEmailVerification && (
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="소속된 학교 이메일 입력"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                      전송
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="인증번호 입력"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="소속된 학교명"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      placeholder="직군"
                      value="학생"
                      readOnly
                      className="block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                인증요청
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LinkedCareerModal;
