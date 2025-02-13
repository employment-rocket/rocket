import api from "../api";

export const getCheckedAnswers = async () => {
	try {
		const response = await api.get("/answers");
		return response.data;
	} catch (error) {
		console.error("Error fetching checked answers:", error);
		throw error;
	}
};

export const getUncheckedAnswers = async () => {
	try {
		const response = await api.get("/answers/unchecked");
		return response.data;
	} catch (error) {
		console.error("Error fetching unchecked answers:", error);
		throw error;
	}
};

export const createAnswer = async ({ category, qid, content = "", isIn = true }) => {
	try {
		const response = await api.post("/answers", null, {
			params: { category, qid, content, isIn },
		});
		return response.data;
	} catch (error) {
		console.error("Error creating answer:", error);
		throw error;
	}
};

export const updateAnswer = async ({ answerId, content }) => {
	try {
		const response = await api.patch("/answers/content", null, {
			params: { answerId, content },
		});
		return response.data;
	} catch (error) {
		console.error("Error updating answer:", error);
		throw error;
	}
};

export const toggleAnswerIsIn = async ({ answerId }) => {
	try {
		const response = await api.patch("/answers/check", null, {
			params: { answerId },
		});
		return response.data;
	} catch (error) {
		console.error("Error toggling answer isIn:", error);
		throw error;
	}
};

export const deleteAnswer = async ({ category, qid }) => {
	try {
		const response = await api.delete("/answers", {
			params: { category, qid },
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting answer:", error);
		throw error;
	}
};

export const getCsQuestions = async (subcategories) => {
	const params = new URLSearchParams();
	subcategories.forEach((subcategory) => params.append("subcategories", subcategory));

	try {
		const response = await api.get("/questions/cs", { params });
		return response.data;
	} catch (error) {
		console.error("Error fetching CS questions:", error);
		throw error;
	}
};

export const getPersonalQuestions = async () => {
	try {
		const response = await api.get("/questions/personal");
		return response.data;
	} catch (error) {
		console.error("Error fetching personal questions:", error);
		throw error;
	}
};

export const getSchedulesWithQuestions = async () => {
	try {
		const response = await api.get("/schedules/with-questions");
		return response.data;
	} catch (error) {
		console.error("Error fetching schedules with questions:", error);
		throw error;
	}
};

export const getReviewQAList = async (scheduleId) => {
	try {
		const response = await api.get(`/questions/review-qa/${scheduleId}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching review QA for scheduleId ${scheduleId}:`, error);
		throw error;
	}
};

export const createReview = async (scheduleId) => {
	try {
		const response = await api.post(`/schedules/review`, null, {
			params: { scheduleId },
		});
		return response.data;
	} catch (error) {
		console.error("Error creating review:", error);
		throw error;
	}
};

export const createReviewQuestion = async (scheduleId, question) => {
	try {
		const response = await api.post(`/questions/review-qa`, {
			scheduleId,
			question,
		});
		return response.data;
	} catch (error) {
		console.error("Error creating review question:", error);
		throw error;
	}
};

export const deleteReviewBySchedule = async (scheduleId) => {
	try {
		await api.delete(`/questions/review-qa/schedule/${scheduleId}`);
	} catch (error) {
		console.error("Error deleting review QA:", error);
		throw error;
	}
};

export const deleteReviewQA = async (qid) => {
	try {
		await api.delete(`/questions/review-qa/${qid}`);
	} catch (error) {
		console.error("Error deleting review question:", error);
		throw error;
	}
};

export const updateReviewQA = async (qid, newQuestion) => {
	try {
		const response = await api.patch(`/questions/review-qa/${qid}`, { question: newQuestion });
		return response.data;
	} catch (error) {
		console.error("Error updating review question:", error);
		throw error;
	}
};

