import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import logo from "../../assets/logo.png";
import bell from "../../assets/icon-notification.png";
import chat from "../../assets/chat.png";
import defaultProfile from "../../assets/default-profile.png";
import LoginPage from "../../pages/Login";
import DropdownMenu from "./DropdownMenu";
import Alarm from "../alarm/Alarm";
import ChatModal from "../note/ChatModal";
import { useAuth } from "../../context/auth/AuthContext";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, logout, getProfileImage } = useAuth();

	const [isModalOpen, setModalOpen] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [isAlarmOpen, setAlarmOpen] = useState(false);
	const [isChatOpen, setChatOpen] = useState(false);
	const [profileImage, setProfileImage] = useState(defaultProfile);

	useEffect(() => {
		if (isAuthenticated) {
			const fetchProfileImage = async () => {
				try {
					const imageUrl = await getProfileImage();
					setProfileImage(imageUrl || defaultProfile);
				} catch (error) {
					console.error("Error fetching profile image:", error);
					setProfileImage(defaultProfile);
				}
			};
			fetchProfileImage();
		} else {
			setProfileImage(defaultProfile);
		}
	}, [isAuthenticated, location]);

	const handleProfileClick = () => {
		if(isLogin){
			setDropdownOpen(!isDropdownOpen);
		}else{
			setModalOpen(true);
		}
		setAlarmOpen(false);
		setChatOpen(false);
	};

	const handleAlarmClick = () => {
		setAlarmOpen(!isAlarmOpen);
		setDropdownOpen(false);
		setChatOpen(false);
	};

	const handleChatClick = () => {
		setChatOpen(!isChatOpen);
		setDropdownOpen(false);
		setAlarmOpen(false);
	};

	return (
		<div
			className="flex items-center w-full top-0 h-[60px] px-6 border-b border-gray-300"
			style={{ fontFamily: "CookieBold" }}
		>
			<div
				className="flex items-center cursor-pointer border-r border-gray-300 pr-6"
				onClick={() => navigate("/board")}
			>
				<img src={logo} alt="메인로고" className="h-8 w-8 mr-2 rounded-full" />
				<div className="text-lg font-bold">취업 로켓</div>
			</div>

			<div className="flex space-x-6 ml-6 text-base">
				{[
					{ path: "/board", label: "게시판" },
					{ path: "/schedule", label: "일정 관리" },
					{ path: "/question", label: "면접 질문" },
					{ path: "/site", label: "취준 도움 사이트" },
					{ path: "/career", label: "커리어" },
				].map(({ path, label }) => (
					<div
						key={path}
						className={`cursor-pointer ${location.pathname.startsWith(path)
							? "text-blue-500 font-semibold"
							: "text-gray-700"
							}`}
						onClick={() => navigate(path)}
					>
						{label}
					</div>
				))}
			</div>

			<div className="flex items-center space-x-4 ml-auto">
				{isAuthenticated ? (
					<>
						<img
							src={profileImage}
							alt="프로필이미지"
							className="h-6 w-6 cursor-pointer rounded-full"
							onClick={handleProfileClick}
						/>
						<img
							src={bell}
							alt="알림"
							className="h-6 w-6 cursor-pointer"
							onClick={handleAlarmClick}
						/>
						{isAlarmOpen && <Alarm onClose={() => setAlarmOpen(false)} />}
						<DropdownMenu
							isOpen={isDropdownOpen}
							onClose={() => setDropdownOpen(false)}
							onNavigate={(action) => {
								if (action === "logout") logout();
							}}
						/>
						<img
							src={chat}
							alt="채팅"
							className="h-6 w-6 cursor-pointer"
							onClick={handleChatClick}
						/>
						{isChatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
					</>
				) : (
					<button
						className="text-blue-500 hover:text-blue-700"
						onClick={() => setModalOpen(true)}
					>
						로그인
					</button>
				)}
			</div>

			{isModalOpen && (
				<LoginPage isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
			)}
		</div>
	);
};

export default Header;