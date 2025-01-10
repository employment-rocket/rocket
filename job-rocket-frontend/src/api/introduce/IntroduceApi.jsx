import api from "../api";

export const uploadIntroduce = async (file, memberId, name) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("memberId", 1);
		formData.append("name", name);

		const response = await api.post("/introduces/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		const errorMessage =
			error.response?.data?.message || "파일 업로드 실패";
		throw new Error(errorMessage);
	}
};

export const getIntroduces = async (memberId) => {
	try {
		const response = await api.get("/introduces", {
			params: { memberId: 1 },
		});
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

export const getIntroduceQuestions = async (introduceId, memberId) => {
	try {
		const response = await api.get(
			`/questions/introduce-qa/${introduceId}`,
			{
				params: { memberId: 1 },
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching introduce questions:", error);
		throw error;
	}
};

export const deleteIntroduceQuestion = async (qid) => {
	try {
		await api.delete(`/questions/introduce-qa/${qid}`);
	} catch (error) {
		console.error("Error deleting question:", error);
		throw error;
	}
};
