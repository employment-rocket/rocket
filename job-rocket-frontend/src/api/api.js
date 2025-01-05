import axios from "axios";
console.log(import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
	timeout: 2000,
	headers: {
		"Content-Type": "application/json",
	},
});

// 요청 인터셉터
api.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("AccessToken");
		if (accessToken) {
			config.headers["Authorization"] = `${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 응답 인터셉터
api.interceptors.response.use(
	(response) => response, 
	async (error) => {
		const originalRequest = error.config;

		// AccessToken이 만료된 경우 (401 Unauthorized)
		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true; 

			const refreshToken = localStorage.getItem("RefreshToken");
			if (refreshToken) {
				try {
					
					const response = await axios.post(
						`${
							import.meta.env.VITE_API_BASE_URL
						}/login/auth/refresh`, 
						null,
						{
							headers: {
								"Authorization-refresh": `${refreshToken}`,
							},
						}
					);

					const newAccessToken = response.headers["authorization"];

					localStorage.setItem("AccessToken", newAccessToken);


					originalRequest.headers[
						"Authorization"
					] = `${newAccessToken}`;
					return api(originalRequest); 
				} catch (refreshError) {
					console.error("리프레시토큰 세션 만료!:", refreshError);
					alert("세션이 만료되었습니다! 다시 로그인해주세요.");
					localStorage.removeItem("AccessToken");
					localStorage.removeItem("RefreshToken");
					window.location.href = "/board"; 
					return Promise.reject(refreshError);
				}
			} else {
				console.error("No RefreshToken found. Redirecting to login");
				window.location.href = "/board";
			}
		}

		return Promise.reject(error);
	}
);

export default api;