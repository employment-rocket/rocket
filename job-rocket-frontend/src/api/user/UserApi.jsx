import api from "../api";

export const getUserProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  export const uploadProfileFile = async (file, userId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId); 
  
    try {
      const response = await api.post("/user/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; 
    }
  };

  export const getProfileImage = async () => {
    try {
      const response = await api.get(`user/file/upload`, {
        responseType: 'arraybuffer' 
      });
      
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob); 
      return imageUrl;
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  };
  

export const updatedAllowEmail = async (userId, allowEmail) => {
  try {
    const response = await api.post(`/user/settings/email/${userId}`, {
      allowEmail
    });
    return response.data;
  } catch (error) {
    console.error("Error updating email settings:", error);
    throw error;
  }
};


export const updatedAllowAlarm = async (userId, allowAlarm) => {
  try {
    const response = await api.post(`/user/settings/alarm/${userId}`, {
      allowAlarm
    });
    return response.data; 
  } catch (error) {
    console.error("Error updating alarm settings:", error);
    throw error;
  }
};
