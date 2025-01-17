import api from "../api";

export const getUserNicknameAndId = async () => {
    try {
      const response = await api.get("/member/profile");
      console.log("받은 데이터: ",response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getUserProfile = async (userId) => {
    try {
      const response = await api.get(`/member/mypage/${userId}`);
      console.log("받은 데이터: ", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  