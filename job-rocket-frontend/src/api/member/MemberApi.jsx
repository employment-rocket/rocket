import api from "../api";

export const getUserNicknameAndId = async () => {
    try {
      const response = await api.get("/member/profile");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getUserProfile = async (userId) => {
    try {
      const response = await api.get(`/member/mypage/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  export const updateUserProfile = async (userId, updatedProfile) => {
    try {
      const response = await api.post(`/member/mypage/${userId}`, updatedProfile);
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; 
    }
  };

  export const uploadProfileFile = async (file, userId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId); 
  
    try {
      const response = await api.post("/member/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; 
    }
  };

  export const getProfileImage = async (userId) => {
    try {
      const response = await api.get(`member/uploads/${userId}`, {
        responseType: 'arraybuffer' 
      });
      
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob); 
      return imageUrl;
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  };
  