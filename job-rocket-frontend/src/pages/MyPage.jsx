import React from "react";
import { useState, useEffect } from "react";
import { getUserProfile } from "../api/member/MemberApi";
import { useParams } from "react-router";
import logo from "../assets/default-profile.png";
import { updateUserProfile, uploadProfileFile, getProfileImage } from "../api/member/MemberApi"

const MyPage = () => {
  const {userId} = useParams();
  const [email, setEmail] = useState();
  const [allowEmail, setAllowEmail] = useState();
  const [allowAlarm, setAllowAlarm] = useState();
  const [nickname, setNickname] = useState();
  const [profile, setProfile] = useState();
 
  useEffect(() => {
    const fetchUserProfile = async () => {
    try{
      const data = await getUserProfile(userId); 
      setAllowEmail(data.allowEmail);
      setAllowAlarm(data.allowAlarm);
      setNickname(data.nickname);
      setEmail(data.email);


        const fetchImage = async () => {
            try {
              const imageUrl = await getProfileImage(userId);
              if (imageUrl) {
                setProfile(imageUrl);
              }
            } catch (error) {
              console.error("Failed to fetch profile image:", error);
            }
          };
  
          fetchImage();
        } catch (error) {
          console.error("유저 프로필 로드 실패:", error);
        }
      };
    if(userId){
        fetchUserProfile(); 
    }
    else{
        console.error("Invalid userId");
    }
  }, [userId]); 

  const handleAllowEmailChange = () => {
    setAllowEmail(!allowEmail);
  };

  const handleAllowAlarmChange = () => {
    setAllowAlarm(!allowAlarm);
  }; 
  const handleFileUpload = async (file) => {
    try {
      await uploadProfileFile(file,userId);

      const imageUri = await getProfileImage(userId);
      setProfile(imageUri);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleSaveProfile = async () => {
    const updatedProfile = {
      allowEmail,
      allowAlarm,
      profile,
      nickname,
    };
    try {
        await updateUserProfile(userId, updatedProfile); 
        alert("저장되었습니다.");
    } catch (error) {
      console.error("프로필 저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };
   return (
    <div className="flex items-center justify-center min-h-screen">

  <div className="w-[632px] h-[600px] rounded-2xl border border-gray-300 bg-white shadow-md flex flex-col justify-center items-center"
       style={{ fontFamily: "CookieBold" }}>

    <div className="flex items-center mb-8 w-full px-6">
      <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
        이메일
      </div>
      <div className="flex-1 text-xl text-black ml-4">{email}</div>
    </div>


<div className="flex items-center mb-8 w-full px-6">
  <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
    프로필 사진
  </div>
  <img
    className="w-40 h-40 rounded-full ml-8"
    src={profile === 'default'?logo:profile}
    alt="Profile"
  />
  <input
            type="file"
            id="profile-upload"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
  <button
    className="w-[100px] h-[50px] text-xl text-blue-500 border border-gray-300 text-center rounded-lg flex items-center justify-center ml-auto"
    onClick={() => document.getElementById('profile-upload').click()} 
  >
    수정
  </button>
</div>



<div className="flex items-center mb-8 w-full px-6">
  <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
    닉네임
  </div>
  <input
    type="text"
    value={nickname}
    onChange={(e) => setNickname(e.target.value)}
    className="w-[300px] h-[40px] text-xl ml-4 px-2 border border-gray-300 rounded-lg"
  />
</div>



<div className="flex items-center mb-6 w-full px-6">
  <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
    알람 수신
  </div>
  <div className="ml-4">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={allowAlarm}
        onChange={handleAllowAlarmChange}
      />
      <div className="w-16 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 transition duration-200"></div>
      <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-7 transform transition duration-200"></span>
    </label>
  </div>
</div>

<div className="flex items-center w-full px-6 mb-1">
  <div className="w-[164px] h-[50px] text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
    이메일 수신
  </div>
  <div className="ml-4">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={allowEmail}
        onChange={handleAllowEmailChange} 
      />
      <div className="w-16 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 transition duration-200"></div>
      <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-7 transform transition duration-200"></span>
    </label>
  </div>


  <button className="ml-auto w-[100px] h-[50px] text-xl text-black border border-gray-300 rounded-lg flex items-center justify-center"
  onClick={handleSaveProfile}>
    저장
  </button>
</div>

    </div>
    </div>

  
  );
};

export default MyPage;
