import React from "react";
import { useState, useEffect } from "react";
import { getUserProfile } from "../api/member/MemberApi";
import { useParams } from "react-router";
import logo from "../assets/default-profile.png";

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
    <div className="flex items-center justify-center min-h-screen">
  {/* 메인 컨테이너 */}
  <div className="w-[632px] h-[600px] rounded-2xl border border-gray-300 bg-white shadow-md flex flex-col justify-center items-center"
       style={{ fontFamily: "CookieBold" }}>
    {/* 이메일 */}
    <div className="flex items-center mb-8 w-full px-6">
      <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
        이메일
      </div>
      <div className="flex-1 text-xl text-black ml-4">{userProfile.email}</div>
    </div>

    {/* 프로필 */}
    <div className="flex items-center mb-8 w-full px-6">
      <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
        프로필 사진
      </div>
      <img className="w-40 h-40 rounded-full ml-8" src={logo} alt="Profile" />
      <button className="ml-16 text-xl text-blue-500">수정</button>
    </div>

    {/* 닉네임 */}
    <div className="flex items-center mb-8 w-full px-6">
      <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
        닉네임
      </div>
      <div className="flex-1 text-xl ml-4">{userProfile.nickname}</div>
      <button className="ml-16 text-xl text-blue-500">수정</button>
    </div>

    {/* 알람 토글 */}
    <div className="flex items-center mb-6 w-full px-6">
      <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
        알람
      </div>
      <label className="inline-flex items-center ml-4">
        <input
          type="checkbox"
          checked={userProfile.allowAlarm}
          readOnly
          className="form-checkbox h-5 w-5 text-blue-500"
        />
      </label>
    </div>

    {/* 이메일 알림 토글 */}
    <div className="flex items-center w-full px-6">
      <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
        이메일 수신
      </div>
      <label className="inline-flex items-center ml-4">
        <input
          type="checkbox"
          checked={userProfile.allowEmail}
          readOnly
          className="form-checkbox h-5 w-5 text-blue-500"
        />
      </label>
    </div>
  </div>
</div>

  
  );
};

export default MyPage;
