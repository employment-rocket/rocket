import React, { useEffect, useState } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const SelfIntroductionView = () => {
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSelfIntroduction = async () => {
      try {
        const fetchedProfile = await getProfile();
        const introSection = fetchedProfile.sections.find(
          (section) => section.type === "SELFINTRO"
        );

        if (introSection) {
          setSelfIntroduction(introSection.data.introduction || "");
        } else {
          setSelfIntroduction("");
        }
      } catch (error) {
        console.error("자기소개 데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelfIntroduction();
  }, []);

  if (isLoading) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
 
      {selfIntroduction ? (
        <div className="bg-gray-50 p-4   border-l-4 border-blue-500 pl-4 ">
          <p className="text-sm text-gray-800 whitespace-pre-wrap text-left leading-relaxed">
            {selfIntroduction}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-left">
          저장된 자기소개가 없습니다.
        </p>
      )}
    </div>
  );
};

export default SelfIntroductionView;
