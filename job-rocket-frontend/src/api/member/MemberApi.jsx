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
      console.log("업로드 결과: ", response);
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; 
    }
  };

  export const getProfileImage = async (userId) => {
    try {
      const response = await api.get(`member/uploads/${userId}`, {
        responseType: 'arraybuffer'  // 이미지 데이터를 arraybuffer로 받아옴
      });
      console.log("받은 데이터: ", response);
      
      // 바이너리 데이터를 Blob 형태로 변환하고 URL로 변환
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });  // MIME 타입에 맞게 수정
      const imageUrl = URL.createObjectURL(imageBlob);  // Blob을 URL로 변환
      return imageUrl;
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  };
  