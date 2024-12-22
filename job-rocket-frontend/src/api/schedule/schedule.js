import { api } from "../api";

export const getSchedules = async () => {
	try {
		const response = await api.get("/schedule");
		return response.data;
	} catch (error) {
		console.error("/schedule api error", error);
		throw error;
	}
};
