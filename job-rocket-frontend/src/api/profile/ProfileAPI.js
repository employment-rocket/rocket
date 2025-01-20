import api from "../api";
import { getUserNicknameAndId } from "../user/UserApi";

const fetchMemberId = async () => {
  try {
    const userData = await getUserNicknameAndId();
    if (userData?.id) {
      return userData.id; 
    } else {
      throw new Error("사용자 ID를 가져올 수 없습니다.");
    }
  } catch (error) {
    console.error("사용자 ID 가져오기 실패:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const memberId = await fetchMemberId();
    const response = await api.get(`/profiles/${memberId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 조회 실패";
    console.error("getProfile API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const addProfile = async (data) => {
  try {
    const memberId = await fetchMemberId();
    const saveResponse = await api.post(`/profiles/${memberId}`, data);
    return saveResponse.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 저장 실패";
    throw new Error(errorMessage);
  }
};

export const updateProfile = async (data) => {
  try {
    const memberId = await fetchMemberId();
    const updateResponse = await api.put(`/profiles/${memberId}`, data);
    return updateResponse.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 수정 실패";
    throw new Error(errorMessage);
  }
};

export const updateOrder = async (reorderedSections) => {
  if (!reorderedSections || reorderedSections.some(section => !section.type || !section.order)) {
    throw new Error("유효하지 않은 섹션 데이터입니다.");
  }

  try {
    const memberId = await fetchMemberId();
    const response = await api.put(`/profiles/${memberId}/order`, reorderedSections);
    return response.data;
  } catch (error) {
    console.error("Order 업데이트 실패:", error);
    throw error;
  }
};

export const updatePublicStatus = async (isPublic) => {
  try {
    const memberId = await fetchMemberId();
    const response = await api.post(`/profiles/${memberId}/status`, null, {
      params: { isPublic },
    });
    console.log("Public status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update public status:", error);
    throw error;
  }
};

export const getPublicProfiles = async () => {
  try {
    const response = await api.get("/profiles/public");
    return response.data;
  } catch (error) {
    throw new Error("공개 프로필 조회 실패");
  }
};

export const getPublicProfileById = async (memberId) => {
  try {
    const response = await api.get(`/profiles/public/${memberId}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${memberId} 프로필 조회 실패:`, error);
    throw new Error("프로필 조회 중 오류가 발생했습니다.");
  }
};
