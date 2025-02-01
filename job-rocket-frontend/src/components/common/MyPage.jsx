import React, { useState, useEffect, useRef } from "react";
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

const MyPage = ({ onClose, onNavigate }) => {
	const navigate = useNavigate();
	const [userId, setUserId] = useState(null);
	const [email, setEmail] = useState("");
	const [allowEmail, setAllowEmail] = useState(false);
	const [allowAlarm, setAllowAlarm] = useState(false);
	const [nickname, setNickname] = useState("");
	const [profile, setProfile] = useState("default");
	const setProfileImage = useProfileStore((state) => state.setProfileImage);
	const myPageRef = useRef();

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const data = await getUserProfile();
				setUserId(data.id);
				setAllowEmail(data.allowEmail || false);
				setAllowAlarm(data.allowAlarm || false);
				setNickname(data.nickname || "");
				setEmail(data.email || "");
				setProfile(data.profile || "default");

				if (data.profile !== "default") {
					const fetchImage = async () => {
						try {
							const imageUrl = await getProfileImage();
							setProfile(imageUrl);
						} catch (error) { }
					};
					fetchImage();
				}
			} catch (error) { }
		};
		fetchUserProfile();

		const handleClickOutside = (event) => {
			const profileImage = document.querySelector(".profile-image");
			if (
				myPageRef.current &&
				!myPageRef.current.contains(event.target) &&
				(!profileImage || !profileImage.contains(event.target))
			) {
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
		} catch (error) { }
	};

	const handleAllowAlarmChange = async () => {
		const updateAllowAlarm = !allowAlarm;
		setAllowAlarm(updateAllowAlarm);
		try {
			await updatedAllowAlarm(userId, updateAllowAlarm);
		} catch (error) { }
	};

	const handleFileUpload = async (file) => {
		try {
			await uploadProfileFile(file, userId);
			const imageUri = await getProfileImage(userId);
			setProfileImage(imageUri);
			setProfile(imageUri);
		} catch (error) { }
	};

	return (
		<div ref={myPageRef} className="absolute top-14 right-3 flex items-center justify-center bg-white z-50">
			<div className="w-[300px] h-[450px] rounded-2xl border border-gray-300 bg-white shadow-md flex flex-col justify-center items-center" style={{ fontFamily: "CookieBold" }}>
				<div className="w-4/5 h-px bg-gray-300 mt-1"></div>
				<div className="flex items-center mb-8 w-full px-6 justify-center mr-8 relative mt-6">
					<img className="w-24 h-24 rounded-full ml-8 border border-gray-300" src={profile === "default" ? logo : profile} alt="Profile" />
					<input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} />
					<img className="w-7 h-7 rounded-full ml-10 absolute bottom-0 right-[80px]" src={camera} alt="camera icon" onClick={() => document.getElementById("profile-upload").click()} />
				</div>
				<div className="flex items-center mb-3 w-full px-6">
					<div className="flex-1 text-xl text-black text-center">{nickname || "닉네임 없음"}</div>
				</div>
				<div className="flex items-center mb-8 w-full px-6">
					<div className="flex-1 text-xl text-gray-500 ml-4 text-center">{email || "이메일 없음"}</div>
				</div>
				<div className="flex items-center mb-3 w-full px-6">
					<div className="w-[130px] h-[40px] ml-6 text-l text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">알람 수신 동의</div>
					<div className="ml-4">
						<label className="relative inline-flex items-center cursor-pointer mt-1">
							<input type="checkbox" className="sr-only peer" checked={!!allowAlarm} onChange={handleAllowAlarmChange} />
							<div className="w-16 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 transition duration-200"></div>
							<span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-7 transform transition duration-200"></span>
						</label>
					</div>
				</div>
				<div className="flex items-center w-full px-6 mb-1">
					<div className="w-[130px] h-[40px] text-l ml-6 text-black border border-gray-300 text-center rounded-lg flex items-center justify-center">이메일 수신 동의</div>
					<div className="ml-4">
						<label className="relative inline-flex items-center cursor-pointer mt-1">
							<input type="checkbox" className="sr-only peer" checked={!!allowEmail} onChange={handleAllowEmailChange} />
							<div className="w-16 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 transition duration-200"></div>
							<span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-7 transform transition duration-200"></span>
						</label>
					</div>
				</div>
				<div className="w-4/5 h-px bg-gray-300 mt-3"></div>
				<div className="flex items-center justify-center w-full px-6">
					<button className="w-[150px] h-[35px] mt-3 text-center text-red-500 text-xl border-2 border-red-500 text-center rounded-lg" onClick={() => onNavigate("logout")}>
						로그아웃
					</button>
				</div>
			</div>
		</div>
	);
};

export default MyPage;
