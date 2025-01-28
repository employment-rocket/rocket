import api from "../api";

const getFreeBoardList = async () => {
	try {
		const response = await api.get("/board/free");
		return response.data;
	} catch (error) {
		console.error("/board/free api get error", error);
		throw error;
	}
};

const getFreeBoard = async ({ boardId }) => {
	try {
		const response = await api.get(`/board/free/${boardId}`);
		console.log("여기 ", response);
		return response.data;
	} catch (error) {
		console.error(`/board/free/${boardId}`, error);
	}
};

const createFreeBoard = async (title, content) => {
	const body = {
		title: title,
		content: content,
	};
	console.log("api", body);
	try {
		await api.post("/board/free", body);
	} catch (error) {
		console.error("/board/free api post error", error);
	}
};

export { getFreeBoardList, getFreeBoard, createFreeBoard };
