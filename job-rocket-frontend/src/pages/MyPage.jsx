import React from "react";
import { useState, useEffect } from "react";
import { getUserProfile } from "../api/member/MemberApi";
import { useParams } from "react-router";

const MyPage = () => {
  const {userId} = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile(userId); 
      setUserProfile(data); 
    };
    if(userId){
        fetchUserProfile(); 
    }
    else{
        console.error("Invalid userId");
    }
  }, [userId]); 

  if (!userProfile) {
    return <div>Loading...</div>;
  }

   return (
    <div className="w-[632px] h-[610px] relative">
      <div className="w-[541px] h-[553px] left-[46px] top-[26px] absolute">
        
        {/* 이메일 */}
        <div className="flex items-center mb-4">
          <div className="text-xl font-bold">이메일</div>
          <div className="ml-4 text-xl">{userProfile.email}</div>
        </div>

        {/* 프로필 */}
        <div className="flex items-center mb-4">
          <div className="text-xl font-bold">프로필</div>
          <img
            className="ml-4 w-[40px] h-[40px] rounded-full"
            src={userProfile.profileImg}
            alt="Profile"
          />
          <button className="ml-4 text-lg text-blue-500">수정</button>
        </div>

        {/* 닉네임 */}
        <div className="flex items-center mb-4">
          <div className="text-xl font-bold">닉네임</div>
          <div className="ml-4 text-xl">{userProfile.nickname}</div>
          <button className="ml-4 text-lg text-blue-500">수정</button>
        </div>

        {/* 알람 토글 */}
        <div className="flex items-center mb-4">
          <div className="text-xl font-bold">알람</div>
          <div className="ml-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={userProfile.allowAlarm} readOnly className="form-checkbox h-5 w-5 text-blue-500" />
            </label>
          </div>
        </div>

        {/* 이메일 토글 */}
        <div className="flex items-center mb-4">
          <div className="text-xl font-bold">이메일 알림</div>
          <div className="ml-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={userProfile.allowEmail} readOnly className="form-checkbox h-5 w-5 text-blue-500" />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyPage;
