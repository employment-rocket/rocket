import { api } from "../api";

export const getCheckedAnswers = async (memberId) => {
    try {
        const response = await api.get("/answers", {
            params: { memberId },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching checked answers:", error);
        throw error;
    }
};

export const getUncheckedAnswers = async (memberId) => {
    try {
        const response = await api.get("/answers/unchecked", {
            params: { memberId },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching unchecked answers:", error);
        throw error;
    }
};

export const createAnswer = async ({ memberId, category, qid, content = "", isIn = true }) => {
    try {
        const response = await api.post("/answers", null, {
            params: { memberId, category: category, qid, content, isIn },
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

export const deleteAnswer = async ({ memberId, category, qid }) => {
    try {
        const response = await api.delete("/answers", {
            params: { memberId, category, qid },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting answer:", error);
        throw error;
    }
};

export const getCsQuestions = async (page, memberId, subcategories) => {
    const params = new URLSearchParams();
    params.append("memberId", memberId);
    subcategories.forEach((subcategory) => params.append("subcategories", subcategory));

    const response = await api.get(`/questions/cs/${page}`, { params });
    return response.data;
};

export const getPersonalQuestions = async (page, memberId) => {
    const params = new URLSearchParams();
    params.append("memberId", memberId);

    const response = await api.get(`/questions/personal/${page}`, { params });
    return response.data;
};