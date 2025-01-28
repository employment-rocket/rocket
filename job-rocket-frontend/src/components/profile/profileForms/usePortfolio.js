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
     
        const urls =
          portfolioSection.data.urls?.map((url) => ({
            id: generateUniqueId(),
            type: "url",
            value: url,
          })) || [];
  
        const files =
          portfolioSection.data.files?.map((file) => ({
            id: generateUniqueId(),
            type: "file",
            value: file.savedFileName,
            name: file.originalFileName,
          })) || [];
  
        const images =
          portfolioSection.data.images?.map((image) => ({
            id: generateUniqueId(),
            type: "image",
            value: image.savedFileName,
            name: image.originalFileName,
          })) || [];
  
        setItems([...urls, ...files, ...images]);
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
  
      const newFiles = uploadedFiles.map((response) => ({
        id: generateUniqueId(),
        type: "file",
        value: response.savedFileName,
        name: response.originalFileName,
      }));
  
      setItems((prevItems) => [...prevItems, ...newFiles]);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드 중 문제가 발생했습니다.");
    }
  };
  

  const handleSavePortfolio = async () => {
    try {
      const newUrls = items
        .filter((item) => item.type === "url")
        .map((item) => item.value.trim());
      const newFiles = items
        .filter((item) => item.type === "file")
        .map((item) => ({
          savedFileName: item.value,
          originalFileName: item.name,
        }));
      const newImages = items
        .filter((item) => item.type === "image")
        .map((item) => ({
          savedFileName: item.value,
          originalFileName: item.name,
        }));
  
      const payload = {
        type: "PORTFOLIO",
        data: { urls: newUrls, files: newFiles, images: newImages },
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
      const newUrls = items
        .filter((item) => item.type === "url")
        .map((item) => item.value.trim());
      const newFiles = items
        .filter((item) => item.type === "file")
        .map((item) => ({
          savedFileName: item.value,
          originalFileName: item.name,
        }));
      const newImages = items
        .filter((item) => item.type === "image")
        .map((item) => ({
          savedFileName: item.value,
          originalFileName: item.name,
        }));
  
      const payload = {
        type: "PORTFOLIO",
        data: { urls: newUrls, files: newFiles, images: newImages },
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
