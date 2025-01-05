import React from "react";
import logo from "../assets/logo.png";
import naver from "../assets/naver.png";
import kakaoImage from "../assets/kakao.png";


const LoginPage = ({ isOpen, onClose}) => {

   
  const KAKAO_REST_API_KEY = '714bf4a422faf6cbe152f3e8b10c01e7';
  const KAKAO_REDIRECT_URI = 'http://localhost:5173/login/oauth2/callback/kakao';
  
  const NAVER_CLIENT_ID = 'I7xTiihFFuXurRYknV5O';
  const NAVER_REDIRECT_URI = 'http://localhost:5173/login/oauth2/code/naver';

  const state = encodeURIComponent(Math.random().toString(36).substring(2, 15));


  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${state}&redirect_uri=${NAVER_REDIRECT_URI}`;

  const handleClickKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
        console.log(window)
      };
    

  const handleClickNaverLogin = () =>{
    window.location.href = NAVER_AUTH_URL;
    consolelog(window)
  };

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="w-[500px] h-[700px] bg-white rounded-lg p-6 relative">

				<button
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
					onClick={onClose}
				>
					&times;
				</button>
				<div className="text-center">
					<h2 className="text-3xl font-bold mb-4">시작하기</h2>
                    <img
					src={logo}
					alt="메인로고"
                    className="mx-auto mt-8"
					style={{
						height: "190px",
						width: "200px",
					}}
				/>
				
                <button
                    class="w-full max-w-[416px] h-20 bg-white border border-blue-500 shadow rounded-xl flex items-center px-6 mt-12 ml-4"
                    onClick={handleClickNaverLogin}
                >
                    <img
                        class="w-20 h-18 rounded-lg"
                        src={naver}
                        alt="네이버 로고"
                    />
                    <p class="flex-grow text-center text-2xl font-bold text-black">
                        네이버 로그인
                    </p>
                </button>

   
                <button
                    class="w-full max-w-[416px] h-20 bg-white border border-blue-500 shadow rounded-xl flex items-center px-6 mt-8 ml-4"
                    onClick={handleClickKakaoLogin}
                 >
                    <img
                        class="ml-3 w-15 h-14 rounded-lg"
                        src={kakaoImage}
                        alt="카카오 로고"
                    />
                <p class="flex-grow text-center text-2xl font-bold text-black">
                    카카오 로그인
                </p>
                </button>
					<p className="mt-6 text-gray-600">
						혹시 인사담당자이십니까?
					</p>
				</div>
			</div>
		</div>
	);
}
export default LoginPage;
