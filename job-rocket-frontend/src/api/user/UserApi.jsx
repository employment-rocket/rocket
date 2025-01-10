import api from "../api";

export const getUserProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      console.log("받은 데이터: ",response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  