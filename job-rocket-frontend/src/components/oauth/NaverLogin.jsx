import { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../api/api";
import { useAuth } from "../../context/auth/AuthContext";
import {subscribeToPushNotifications} from "../../api/alarm/AlarmSubscribe.js";

const NaverLogin = () => {
  const navigate = useNavigate();

	const { login } = useAuth();
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  console.log("code =", code);
  console.log("state =", state);

  useEffect(() => {
    const naverLogin = async () => {
      try {

        const response = await api.get("/login/oauth2/naver", {
          params: { code, state }, 
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
          subscribeToPushNotifications();
				}, 100);
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
