import api from "../api";

const getSchedules = async () => {
	try {
		const response = await api.get("/schedules");
		return response.data;
	} catch (error) {
		console.error("/schedules api get error", error);
		throw error;
	}
};
const getCalendarSchedule = async () => {
	try {
		const response = await api.get("/schedules/calendars");
		return response.data;
	} catch (error) {
		console.error("/schedules/calendars api get error", error);
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
		const response = await api.post("/schedules", body);
		if (response.status === 201) {
			return response.data;
		} else {
			console.error("/schedules api post error", response);
		}
	} catch (error) {
		console.error("/schedules api post error", error);
	}
};

const modifyScheduleItem = async ({ id, type }) => {
	const body = {
		scheduleId: id,
		type: type,
	};
	try {
		const response = await api.patch("/schedules", body);
		if (response.status === 200) {
			return response.data;
		} else {
			console.log("/schedules api patch error");
		}
	} catch (error) {
		console.log("/schedules api patch error", error);
	}
};

const deleteScheduleItem = async ({ id }) => {
	console.log(id);
	try {
		const response = await api.delete(`/schedules/${id}`);
		if (response.status !== 204) {
			console.log("/schedules api delete error");
		}
	} catch (error) {
		console.log("/schedules api delete error", error);
	}
};

const updateScheduleItem = async ({ id, title, memo, dueDate, state }) => {
	const body = {
		title: title,
		memo: memo,
		dueDate: dueDate,
		state: state,
	};
	try {
		const response = await api.patch(`/schedules/${id}`, body);
		if (response.status !== 200) {
			console.log("/schedules api update error");
		}
	} catch (error) {
		console.log("/schedules api update error", error);
	}
};
export {
	getSchedules,
	createScheduleItem,
	modifyScheduleItem,
	deleteScheduleItem,
	updateScheduleItem,
	getCalendarSchedule,
};
