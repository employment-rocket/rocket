import api from "../api";

const getFreeBoard = async () => {
	try {
		const response = await api.get("/board/free");
		return response.data;
	} catch (error) {
		console.error("/schedules api get error", error);
		throw error;
	}
};

export { getFreeBoard };
