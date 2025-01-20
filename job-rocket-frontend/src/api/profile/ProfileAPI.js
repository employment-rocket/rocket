import api from "../api"; 

export const getProfile = async () => {
  const memberId = localStorage.getItem("memberId") || 2; // 현재 사용자 ID
  if (!memberId) {
    throw new Error("로그인된 사용자 ID가 없습니다.");
  }

  try {
    const response = await api.get(`/profiles/${memberId}`);
    console.log("getProfile API response:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 조회 실패";
    console.error("getProfile API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const addProfile = async (data) => {
  const memberId = localStorage.getItem("memberId") || 2; 
  if (!memberId) {
    throw new Error("로그인된 사용자 ID가 없습니다.");
  }

  try {
  
    const saveResponse = await api.post(`/profiles/${memberId}`, data);
    return saveResponse.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 저장 실패";
    throw new Error(errorMessage); 
  }
};

export const updateProfile = async (data) => {
  const memberId = localStorage.getItem("memberId") || 2; 
  if (!memberId) {
    throw new Error("로그인된 사용자 ID가 없습니다.");
  }

  try {

    const updateResponse = await api.put(`/profiles/${memberId}`, data);
    return updateResponse.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 수정 실패";
    throw new Error(errorMessage); 
  }
};

export const updateOrder = async (reorderedSections) => {
  const memberId = localStorage.getItem("memberId") || 2;


  if (!reorderedSections || reorderedSections.some(section => !section.type || !section.order)) {
    throw new Error("유효하지 않은 섹션 데이터입니다.");
  }

  try {
    const response = await api.put(`/profiles/${memberId}/order`, reorderedSections);
    return response.data;
  } catch (error) {
    console.error("Order 업데이트 실패:", error);
    throw error;
  }
};

