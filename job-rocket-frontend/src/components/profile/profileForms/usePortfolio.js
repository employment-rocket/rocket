import { useState } from "react";
import { getProfile, addProfile, updateProfile, uploadFile, fetchFile } from "../../../api/profile/ProfileAPI";

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const usePortfolio = (order) => {
  const [items, setItems] = useState([]);
  const [hasSavedPortfolio, setHasSavedPortfolio] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const profileData = await getProfile();
      const portfolioSection = profileData.sections.find(
        (section) => section.type === "PORTFOLIO"
      );

      if (portfolioSection) {
        const urls = portfolioSection.data.urls?.map((url) => ({
          id: generateUniqueId(),
          type: "url",
          value: url,
        })) || [];
        const files = await Promise.all(
          (portfolioSection.data.files || []).map(async (file) => {
            if (!file.fileName && !file.name) return null;
            const fileUrl = await fetchFile(file.fileName || file.name, "FILEUPLOAD").catch(() => null);
            return fileUrl
              ? {
                  id: generateUniqueId(),
                  type: "file",
                  value: fileUrl,
                }
              : null;
          })
        );
        const images = await Promise.all(
          (portfolioSection.data.images || []).map(async (image) => {
            if (!image.fileName && !image.name) return null;
            const imageUrl = await fetchFile(image.fileName || image.name, "PROFILE_IMAGE").catch(() => null);
            return imageUrl
              ? {
                  id: generateUniqueId(),
                  type: "image",
                  value: imageUrl,
                }
              : null;
          })
        );

        setItems([...urls, ...files.filter(Boolean), ...images.filter(Boolean)]);
        setHasSavedPortfolio(true);
      } else {
        setItems([]);
        setHasSavedPortfolio(false);
      }
    } catch (error) {
      console.error("포트폴리오 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = (type) => {
    if (type === "url") {
      setItems((prevItems) => [
        ...prevItems,
        { id: generateUniqueId(), type, value: "" },
      ]);
    }
  };

  const handleItemChange = (id, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);

    try {
      const uploadedFiles = await Promise.all(
        files.map((file) => uploadFile(file, "FILEUPLOAD"))
      );

      const newFiles = uploadedFiles.map((fileUrl) => ({
        id: generateUniqueId(),
        type: /\.(jpg|jpeg|png|gif)$/i.test(fileUrl) ? "image" : "file",
        value: fileUrl,
      }));

      setItems((prevItems) => [...prevItems, ...newFiles]);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드 중 문제가 발생했습니다.");
    }
  };

  const handleSavePortfolio = async () => {
    try {
      const profileData = await getProfile();
      const portfolioSection = profileData.sections.find(
        (section) => section.type === "PORTFOLIO"
      );

      const existingUrls = portfolioSection?.data.urls || [];
      const existingFiles = portfolioSection?.data.files || [];
      const existingImages = portfolioSection?.data.images || [];

      const newUrls = items
        .filter((item) => item.type === "url")
        .map((item) => item.value.trim());
      const newFiles = items
        .filter((item) => item.type === "file")
        .map((item) => item.value);
      const newImages = items
        .filter((item) => item.type === "image")
        .map((item) => item.value);

      const mergedData = {
        urls: Array.from(new Set([...existingUrls, ...newUrls])),
        files: Array.from(new Set([...existingFiles, ...newFiles])),
        images: Array.from(new Set([...existingImages, ...newImages])),
      };

      const payload = {
        type: "PORTFOLIO",
        data: mergedData,
        order,
      };

      await addProfile(payload);
      alert("포트폴리오가 성공적으로 저장되었습니다!");
      fetchPortfolio();
    } catch (error) {
      console.error("포트폴리오 저장 실패:", error);
      alert("포트폴리오 저장 중 문제가 발생했습니다.");
    }
  };

  const handleUpdatePortfolio = async () => {
    try {
      const profileData = await getProfile();
      const portfolioSection = profileData.sections.find(
        (section) => section.type === "PORTFOLIO"
      );

      const existingUrls = portfolioSection?.data.urls || [];
      const existingFiles = portfolioSection?.data.files || [];
      const existingImages = portfolioSection?.data.images || [];

      const newUrls = items
        .filter((item) => item.type === "url")
        .map((item) => item.value.trim());
      const newFiles = items
        .filter((item) => item.type === "file")
        .map((item) => item.value);
      const newImages = items
        .filter((item) => item.type === "image")
        .map((item) => item.value);

      const mergedData = {
        urls: Array.from(new Set([...existingUrls, ...newUrls])),
        files: Array.from(new Set([...existingFiles, ...newFiles])),
        images: Array.from(new Set([...existingImages, ...newImages])),
      };

      const payload = {
        type: "PORTFOLIO",
        data: mergedData,
        order,
      };

      await updateProfile(payload);
      alert("포트폴리오가 성공적으로 수정되었습니다!");
      fetchPortfolio();
    } catch (error) {
      console.error("포트폴리오 수정 실패:", error);
      alert("포트폴리오 수정 중 문제가 발생했습니다.");
    }
  };

  return {
    items,
    setItems,
    hasSavedPortfolio,
    isLoading,
    fetchPortfolio,
    handleAddItem,
    handleItemChange,
    handleFileUpload,
    handleSavePortfolio,
    handleUpdatePortfolio,
  };
};
