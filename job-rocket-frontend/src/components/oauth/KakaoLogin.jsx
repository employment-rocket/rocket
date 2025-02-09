import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext"; // ✅ AuthContext 추가
import api from "../../api/api";

const KakaoLogin = () => {
	const navigate = useNavigate();
	const { login } = useAuth(); // ✅ 로그인 상태 업데이트를 위한 함수 가져오기

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

				login(); // ✅ AuthProvider의 isAuthenticated를 true로 변경

				setTimeout(() => {
					navigate("/career");
				}, 100); // ✅ 상태 반영을 위해 약간의 지연 추가
			} catch (error) {
				console.error("Kakao Login Failed:", error);
			}
		};

		if (code) {
			kakaoLogin();
		}
	}, [code, navigate, login]);

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
