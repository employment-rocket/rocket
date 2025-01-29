import { Typography } from "antd";
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

const getFreeCommentList = async ({ boardId }) => {
	try {
		const response = await api.get(`/board/free/${boardId}/comment`);
		return response.data;
	} catch (error) {
		console.log(`/board/free/${boardId}/comment`, error);
	}
};

const getFreeBoard = async ({ boardId }) => {
	try {
		const response = await api.get(`/board/free/${boardId}`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error(`/board/free/${boardId}`, error);
		if (error.status === 404) {
			alert("존재하지 않는 게시물입니다.");
			return error.status;
		}
	}
};

const deleteFreeBoard = async ({ boardId }) => {
	try {
		const response = await api.delete(`/board/free/${boardId}`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error(`/board/free/${boardId}`, error);
	}
};

const patchFreeBoard = async ({ boardId, data }) => {
	console.log("boardId = ", boardId);
	console.log("data = ", data);
	try {
		const response = await api.patch(`/board/free/${boardId}`, data);
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

export {
	getFreeBoardList,
	getFreeCommentList,
	getFreeBoard,
	deleteFreeBoard,
	createFreeBoard,
	patchFreeBoard,
	createComment,
};
