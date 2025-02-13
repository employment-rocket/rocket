import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";
import api from "../../api/api";
import {subscribeToPushNotifications} from "../../api/alarm/AlarmSubscribe.js";

const KakaoLogin = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const code = new URL(window.location.href).searchParams.get("code");
	console.log("code =", code);

	useEffect(() => {
		const kakaoLogin = async () => {
			try {
				const response = await api.get("/login/oauth2/kakao", {
					params: { code },
					withCredentials: true,
				});

				const { accessToken, refreshToken } = response.data;
				console.log("Access Token: ", accessToken);
				console.log("Refresh Token: ", refreshToken);

				localStorage.setItem("AccessToken", accessToken);
				localStorage.setItem("RefreshToken", refreshToken);

				login();

				setTimeout(() => {
					navigate("/career");
				}, 100);
			} catch (error) {
				console.error("Kakao Login Failed:", error);
			}
		};

		if (code) {
			kakaoLogin();
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [code, navigate]);

	return (
		<div className="LoginHandler">
			<div className="notice">
				<p>로그인 중입니다...</p>
				<p>잠시만 기다려주세요.</p>
				<div className="spinner"></div>
			</div>
		</div>
	);
};

export default KakaoLogin;
