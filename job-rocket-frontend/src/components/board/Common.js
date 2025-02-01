import { jwtDecode } from "jwt-decode";

export function isAuthor(userId) {
	const token = localStorage.getItem("AccessToken");
	if (token) {
		const userInfo = jwtDecode(token);
		if (userInfo.userId === userId) {
			return true;
		}
	}
	return false;
}
