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
		if (response.status === 200) {
			return response.data;
		} else {
			console.error("/schedule api post error");
		}
	} catch (error) {
		console.error("/schedule api post error", error);
	}
};

export { getSchedules, createScheduleItem };
