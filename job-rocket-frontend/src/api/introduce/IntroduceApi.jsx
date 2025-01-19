import api from "../api";

export const uploadIntroduce = async (file, name) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("name", name);

		const response = await api.post("/introduces/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
			},
		});

		return response.data;
	} catch (error) {
		const errorMessage = error.response?.data?.message || "파일 업로드 실패";
		throw new Error(errorMessage);
	}
};

export const getIntroduces = async () => {
	try {
		const response = await api.get("/introduces");
		return response.data;
	} catch (error) {
		console.error("Error fetching introduces:", error);
		throw error;
	}
};

export const deleteIntroduce = async (introduceId) => {
	try {
		await api.delete(`/introduces/${introduceId}`);
	} catch (error) {
		console.error("Error deleting introduce:", error);
		throw error;
	}
};

export const getIntroduceQuestions = async (introduceId) => {
	try {
		const response = await api.get(`/questions/introduce-qa/${introduceId}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching introduce questions:", error);
		throw error;
	}
};