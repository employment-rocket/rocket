import api from "../api";

const getFreeBoardList = async () => {
	try {
		const response = await api.get("/board/free");
		return response.data;
	} catch (error) {
		console.error("/schedules api get error", error);
		throw error;
	}
};

export { getFreeBoardList };
