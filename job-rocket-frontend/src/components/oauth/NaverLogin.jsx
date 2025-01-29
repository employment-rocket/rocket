import { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../api/api";

const NaverLogin = () => {
	const navigate = useNavigate();

	// URL에서 code와 state 추출
	const code = new URL(window.location.href).searchParams.get("code");
	const state = new URL(window.location.href).searchParams.get("state");

	console.log("code =", code);
	console.log("state =", state);

	useEffect(() => {
		const naverLogin = async () => {
			try {
				// 네이버 인증 서버로 code와 state를 전송
				const response = await api.get("/login/oauth2/naver", {
					params: { code, state }, // 네이버에 필요한 파라미터
					withCredentials: true, // 쿠키 저장을 위해 필요
				});

				// 서버로부터 받은 액세스 토큰과 리프레시 토큰 저장
				const { accessToken, refreshToken } = response.data;
				console.log("Access Token: ", accessToken);
				console.log("Refresh Token: ", refreshToken);

				localStorage.setItem("AccessToken", accessToken);
				localStorage.setItem("RefreshToken", refreshToken);

				// 로그인 성공 후, 메인 페이지로 이동
				if (response.status === 200) {
					navigate("/career");
				}
			} catch (error) {
				console.error("Naver Login Failed:", error);
			}
		};

		if (code && state) {
			naverLogin();
		}
	}, [code, state, navigate]);

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

export default NaverLogin;
