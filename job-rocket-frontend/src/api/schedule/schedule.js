import { api } from "../api";

const getSchedules = async () => {
	try {
		const response = await api.get("/schedule");
		return response.data;
	} catch (error) {
		console.error("/schedule api get error", error);
		throw error;
	}
};

const createScheduleItem = async ({ title, dueDate, memo, state }) => {
	const body = {
		title: title,
		dueDate: dueDate,
		memo: memo,
		state: state,
	};
	try {
		const response = await api.post("/schedule", body);
		if (response.status === 201) {
			return response.data;
		} else {
			console.error("/schedule api post error");
		}
	} catch (error) {
		console.error("/schedule api post error", error);
	}
};

const modifyScheduleItem = async ({ id, type }) => {
	const body = {
		scheduleId: id,
		type: type,
	};
	try {
		const response = await api.patch("/schedule", body);
		if (response.status === 200) {
			return response.data;
		} else {
			console.log("/schedule api patch error");
		}
	} catch (error) {
		console.log("/schedule api patch error", error);
	}
};

export { getSchedules, createScheduleItem, modifyScheduleItem };
