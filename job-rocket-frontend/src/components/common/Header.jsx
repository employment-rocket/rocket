import React, { useState, useEffect} from "react";
import logo from "../../assets/logo.png";
import bell from "../../assets/icon-notification.png";
import chat from "../../assets/chat.png";
import defaultProfile from "../../assets/default-profile.png";
import LoginPage from "../../pages/Login";
import { useNavigate, useLocation } from "react-router";
import { getProfileImage } from "../../api/user/UserApi";
import useProfileStore from "../../store/profileImageStore";
import Alarm from "../alarm/Alarm";
import ChatModal from "../note/ChatModal";
import MyPage from "./MyPage";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isModalOpen, setModalOpen] = useState(false);
	const [isMyPageOpen, setMyPageOpen] = useState(false);
	const [isLogin, setLogin] = useState(false);
	const profileImage = useProfileStore((state) => state.profileImage);
	const setProfileImage = useProfileStore((state) => state.setProfileImage);
	const [isAlarmOpen, setAlarmOpen] = useState(false);
	const [isChatOpen, setChatOpen] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("AccessToken");
		setLogin(!!token);
		if (token) {
			const fetchProfileImage = async () => {
				try {
					const imageUrl = await getProfileImage();
					setProfileImage(imageUrl);
				} catch (error) {
					console.error("Error fetching profile image:", error);
					setProfileImage("default");
				}
			};
			fetchProfileImage();
		} else {
			setProfileImage("default");
		}
	}, [location, setProfileImage, isMyPageOpen]);

	const handleLogout = () => {
		localStorage.removeItem("AccessToken");
		localStorage.removeItem("RefreshToken");
		setLogin(false);
		setMyPageOpen(false);
		setProfileImage("default");
		navigate("/");
	};

	const handleProfileClick = (event) => {
		event.stopPropagation();
		if(isLogin){
			setMyPageOpen((prev) => !prev);
		}else{
			setModalOpen(true);
		}
		setAlarmOpen(false);
		setChatOpen(false);
	};

	const handleAlarmClick = () => {
		setAlarmOpen(!isAlarmOpen);
		setMyPageOpen(false);
		setChatOpen(false);
	};

	const handleChatClick = () => {
		setChatOpen(!isChatOpen);
		setMyPageOpen(false);
		setAlarmOpen(false);
	};

	const handleLogin = () => {
		setLogin(true);
		setModalOpen(false);
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
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/board")
							? "text-blue-500 font-semibold"
							: "text-gray-700"
						}`}
					onClick={() => navigate("/board")}
				>
					게시판
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/schedule")
							? "text-blue-500 font-semibold"
							: "text-gray-700"
						}`}
					onClick={() => navigate("/schedule")}
				>
					일정 관리
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/question")
							? "text-blue-500 font-semibold"
							: "text-gray-700"
						}`}
					onClick={() => navigate("/question")}
				>
					면접 질문
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/site")
							? "text-blue-500 font-semibold"
							: "text-gray-700"
						}`}
					onClick={() => navigate("/site")}
				>
					취준 도움 사이트
				</div>
				<div
					className={`cursor-pointer ${location.pathname.startsWith("/career")
							? "text-blue-500 font-semibold"
							: "text-gray-700"
						}`}
					onClick={() => navigate("/career")}
				>
					커리어
				</div>
				<div
					className={`cursor-pointer ${
						location.pathname.startsWith("/talent")
							? "text-blue-500 font-semibold"
							: "text-gray-700"
					}`}
					onClick={() => navigate("/talent")}
				>
					인재풀
				</div>
			</div>

			<div className="flex items-center space-x-4 ml-auto">
				<img
					src={profileImage === "default" ? defaultProfile : profileImage}
					alt="프로필이미지"
					className="h-6 w-6 cursor-pointer rounded-full profile-image"
					onClick={handleProfileClick}
				/>
				{isLogin && (
					<>
						<img
							src={bell}
							alt="알림"
							className="h-6 w-6 cursor-pointer"
							onClick={handleAlarmClick}
						/>
						{isAlarmOpen && <Alarm onClose={() => setAlarmOpen(false)} />}
						{isMyPageOpen && <MyPage
							onClose={() => setMyPageOpen(false)}
							onNavigate={(action) => {
								if (action === "logout") handleLogout();
							}}
						/>}
						<img
							src={chat}
							alt="채팅"
							className="h-6 w-6 cursor-pointer"
							onClick={handleChatClick}
						/>
						{isChatOpen && <ChatModal onClose={() => setChatOpen(false)} />}
					</>
				)}
			</div>
			<LoginPage
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				onLogin={handleLogin}
			/>
		</div>
	);
};

export default Header;
