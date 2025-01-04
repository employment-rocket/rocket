import axios from "axios";
console.log(import.meta.env.VITE_API_BASE_URL);
const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
	timeout: 2000,
	headers: {
		"Content-Type": "application/json",
	},
});

// 요청 인터셉터 (Request Interceptor)
api.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("AccessToken");
		if (accessToken) {
			config.headers["Authorization"] = `${accessToken}`; // AccessToken 추가
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 응답 인터셉터 (Response Interceptor)
api.interceptors.response.use(
	(response) => response, // 성공적인 응답은 그대로 전달
	async (error) => {
		const originalRequest = error.config;

		// AccessToken이 만료된 경우 (401 Unauthorized)
		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true; // 무한 루프 방지

			const refreshToken = localStorage.getItem("RefreshToken");
			if (refreshToken) {
				try {
					// RefreshToken으로 새로운 AccessToken 발급 요청
					const response = await axios.post(
						`${
							import.meta.env.VITE_API_BASE_URL
						}/login/auth/refresh`, // RefreshToken 발급 API
						null,
						{
							headers: {
								"Authorization-refresh": `Bearer ${refreshToken}`,
							},
						}
					);

					const newAccessToken = response.headers[
						"authorization"
					].replace("Bearer ", "");
					// 새로운 AccessToken 저장
					console.log("newAccessToke: ", newAccessToken);
					localStorage.setItem("AccessToken", newAccessToken);

					// 헤더 업데이트 후 재요청
					originalRequest.headers[
						"Authorization"
					] = `Bearer ${newAccessToken}`;
					return api(originalRequest); // 재요청
				} catch (refreshError) {
					console.error("리프레시토큰 세션 만료!:", refreshError);

					localStorage.removeItem("AccessToken");
					localStorage.removeItem("RefreshToken");
					window.location.href = "/login"; // 로그인 페이지로 이동
					return Promise.reject(refreshError);
				}
			} else {
				// RefreshToken이 없는 경우 로그아웃 처리
				console.error("No RefreshToken found. Redirecting to login");
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export default api;
