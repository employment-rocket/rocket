import { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../api/api";

const KakaoLogin = () => {
  const navigate = useNavigate();


  // 인가 코드 추출
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("code =", code);
  useEffect(() => {
    const kakaoLogin = async () => {
        try {
            const response = await api.get("/login/oauth2/kakao", {
              params: { code }, // 쿼리 파라미터로 'code' 전달
              withCredentials: true, // 쿠키 저장을 위해 필요
            });
            
          // 서버로부터 받은 데이터를 확인
          const {accessToken, refreshToken} = response.data;
            console.log("Access Token: ",accessToken);
            console.log("Refresh Token: ", refreshToken);

            localStorage.setItem("AccessToken", accessToken);
            localStorage.setItem("RefreshToken", refreshToken);
            
          // 로그인 성공 후, 메인 페이지로 이동
           if (response.status === 200){
            navigate("/career");
          }
            
          } catch (error) {
            console.error("Kakao Login Failed:", error);
          }
        };
    
        if (code) {
          kakaoLogin();
        }
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
