import React from "react";
import { useState, useEffect, useRef } from "react";
import { getUserProfile } from "../../api/user/UserApi";
import logo from "../../assets/default-profile.png";
import { useNavigate } from "react-router";
import {
	uploadProfileFile,
	getProfileImage,
	updatedAllowEmail,
	updatedAllowAlarm,
} from "../../api/user/UserApi";
import useProfileStore from "../../store/profileImageStore";
import camera from "../../assets/camera.png";

const MyPage = ({onClose, onNavigate}) => {
	const navigate = useNavigate();
	const [userId, setUserId] = useState();
	const [email, setEmail] = useState();
	const [allowEmail, setAllowEmail] = useState();
	const [allowAlarm, setAllowAlarm] = useState();
	const [nickname, setNickname] = useState();
	const [profile, setProfile] = useState();
	const setProfileImage = useProfileStore((state) => state.setProfileImage);
	const myPageRef = useRef();

	useEffect(() => {

		const fetchUserProfile = async () => {
			try {
				const data = await getUserProfile();
				setUserId(data.id);
				setAllowEmail(data.allowEmail);
				setAllowAlarm(data.allowAlarm);
				setNickname(data.nickname);
				setEmail(data.email);
				setProfile(data.profile);

				if (data.profile !== "default") {
					const fetchImage = async () => {
						try {
							const imageUrl = await getProfileImage();
							setProfile(imageUrl);
						} catch (error) {
							console.error(
								"Failed to fetch profile image:",
								error
							);
						}
					};
					fetchImage();
				}
			} catch (error) {
				console.error("유저 프로필 로드 실패:", error);
			}
		};
		fetchUserProfile();

		const handleClickOutside = (event) => {
			const profileImage = document.querySelector(".profile-image");
			if (myPageRef.current && !myPageRef.current.contains(event.target)&&
			(!profileImage || !profileImage.contains(event.target))) {
				onClose();
			}
		  };
	  
		  document.addEventListener("mousedown", handleClickOutside);
		  return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		  };
		}, [onClose]);


	const handleAllowEmailChange = async () => {
		const updateAllowEmail = !allowEmail;
		setAllowEmail(updateAllowEmail);
		try {
			await updatedAllowEmail(userId, updateAllowEmail);
		} catch (error) {
			console.error("이메일 알림 설정 업데이트 중 오류 발생:", error);
		}
	};

	const handleAllowAlarmChange = async () => {
		const updateAllowAlarm = !allowAlarm;
		setAllowAlarm(updateAllowAlarm);
		try {
			await updatedAllowAlarm(userId, updateAllowAlarm);
		} catch (error) {
			console.error("알람 설정 업데이트 중 오류 발생");
		}
	};

	const handleFileUpload = async (file) => {
		try {
			await uploadProfileFile(file, userId);

			const imageUri = await getProfileImage(userId);
			setProfileImage(imageUri);
			setProfile(imageUri);
		} catch (error) {
			console.error("파일 업로드 실패:", error);
			alert("파일 업로드 중 오류가 발생했습니다.");
		}
	};

	return (

<div ref={myPageRef} className="absolute top-14 right-3 flex items-center justify-center bg-white z-50">

      <div
        className="w-[450px] h-[600px] rounded-2xl border border-gray-300 bg-white shadow-md flex flex-col justify-center items-center"
        style={{ fontFamily: "CookieBold" }}
      >
			<div className="w-4/5 h-px bg-gray-300 mt-1"></div>
        <div className="flex items-center mb-8 w-full px-6 justify-center mr-8 relative mt-6">
          <img
            className="w-40 h-40 rounded-full ml-8 border border-gray-300"
            src={profile === "default" ? logo : profile}
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
		  <img 
		  className="w-7 h-7 rounded-full ml-10 absolute bottom-0 right-[110px]"
		  src={camera}
		  alt="camera icon"
  			onClick={() => document.getElementById("profile-upload").click()}
		  />


		
        </div>

        <div className="flex items-center mb-8 w-full px-6">
          <div className="flex-1 text-3xl text-black text-center">
            {nickname}
          </div>
        </div>

        
        <div className="flex items-center mb-8 w-full px-6">
          <div className="flex-1 text-xl text-gray-500 ml-4 text-center">
            {email}
          </div>
        </div>

        <div className="flex items-center mb-3 w-full px-6">
          <div className="w-[164px] h-[50px] ml-10 text-xl text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
            알람 수신 동의
          </div>
          <div className="ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={allowAlarm}
                onChange={handleAllowAlarmChange}
              />
              <div className="w-32 h-10 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 transition duration-200"></div>
              <span className="absolute left-1 top-1 w-8 h-8 bg-white rounded-full peer-checked:translate-x-20 transform transition duration-200"></span>
            </label>
          </div>
        </div>

        <div className="flex items-center w-full px-6 mb-1">
          <div className="w-[164px] h-[50px] text-xl ml-10 text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">
            이메일 수신 동의
          </div>
          <div className="ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={allowEmail}
                onChange={handleAllowEmailChange}
              />
              <div className="w-32 h-10 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 transition duration-200"></div>
              <span className="absolute left-1 top-1 w-8 h-8 bg-white rounded-full peer-checked:translate-x-20 transform transition duration-200"></span>
            </label>
          </div>
        </div>
		<div className="w-4/5 h-px bg-gray-300 mt-5"></div>
        <div className="flex items-center justify-center w-full px-6">
          <button
            className="w-[200px] h-[45px] mt-5 text-center text-red-500 text-xl border-2 border-red-500 text-center rounded-lg"
            onClick={() => onNavigate("logout")}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
