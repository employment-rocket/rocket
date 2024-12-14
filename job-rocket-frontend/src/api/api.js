import axios from "axios";
console.log(import.meta.env.VITE_API_BASE_URL);
export const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
	timeout: 2000,
	headers: {
		"Content-Type": "application/json",
	},
});