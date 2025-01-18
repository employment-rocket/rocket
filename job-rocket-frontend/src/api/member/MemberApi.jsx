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

  export const updateUserProfile = async (userId, updatedProfile) => {
    try {
      const response = await api.post(`/member/mypage/${userId}`, updatedProfile);
      console.log("업데이트 결과: ", response);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; 
    }
  };

  export const uploadProfileFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await api.post("/member/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("업로드 결과: ", response);
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; 
    }
  };