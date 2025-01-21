import api from "../api";

export const getProfile = async () => {
  try {
    const response = await api.get("/profiles");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 조회 실패";
    console.error("getProfile API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const addProfile = async (data) => {
  try {
    const response = await api.post("/profiles", data); 
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 저장 실패";
    console.error("addProfile API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await api.put("/profiles", data); 
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "프로필 수정 실패";
    console.error("updateProfile API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateOrder = async (reorderedSections) => {
  if (!reorderedSections || reorderedSections.some((section) => !section.type || !section.order)) {
    throw new Error("유효하지 않은 섹션 데이터입니다.");
  }

  try {
    const response = await api.put("/profiles/order", reorderedSections);
    return response.data;
  } catch (error) {
    console.error("Order 업데이트 실패:", error);
    throw error;
  }
};

export const updatePublicStatus = async (isPublic) => {
  try {
    const response = await api.post("/profiles/status", null, {
      params: { isPublic }, 
    });
    console.log("Public status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "공개 상태 변경 실패";
    console.error("updatePublicStatus API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getPublicProfiles = async () => {
  try {
    const response = await api.get("/profiles/public");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "공개 프로필 조회 실패";
    console.error("getPublicProfiles API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getPublicProfileById = async (memberId) => {
  try {
    const response = await api.get(`/profiles/public/${memberId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || `ID ${memberId}의 프로필 조회 실패`;
    console.error("getPublicProfileById API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const uploadFile = async (file, sectionType) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sectionType", sectionType);

    const response = await api.post("/profiles/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("파일 업로드 성공:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "파일 업로드 실패";
    console.error("uploadFile API error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const fetchFile = async (fileName, sectionType) => {
  try {
    const response = await api.get(`/profiles/file/${fileName}`, {
      params: { sectionType },
      responseType: "arraybuffer",
    });

    const fileBlob = new Blob([response.data], {
      type: sectionType === "PROFILE_IMAGE" ? "image/jpeg" : "application/octet-stream",
    });

    const fileUrl = URL.createObjectURL(fileBlob);
    console.log("파일 조회 성공:", fileUrl);
    return fileUrl;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "파일 조회 실패";
    console.error("fetchFile API error:", errorMessage);
    throw new Error(errorMessage);
  }
};
