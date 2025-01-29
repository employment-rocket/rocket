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

const createComment = async ({ boardId, content }) => {
	const body = {
		content: content,
	};
	try {
		await api.post(`/board/free/${boardId}/comment`, body);
	} catch (error) {
		console.error(`/board/free/${boardId}/comment api post error`, error);
	}
};

export { getFreeBoardList, createFreeBoard };
