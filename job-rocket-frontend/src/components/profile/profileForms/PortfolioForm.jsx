import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import PortfolioItems from "./../profileCommon/PortfolioItems";

const PortfolioForm = ({ order, onSave }) => {
  const [items, setItems] = useState([]);
  const [hasSavedPortfolio, setHasSavedPortfolio] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const profileData = await getProfile();
        const portfolioSection = profileData.sections.find(
          (section) => section.type === "PORTFOLIO"
        );

        if (portfolioSection) {
          const urls = portfolioSection.data.urls?.map((url, index) => ({
            id: Date.now() + index,
            type: "url",
            value: url,
          })) || [];
          const files = portfolioSection.data.files?.map((file, index) => ({
            id: Date.now() + index + 1000,
            type: "file",
            value: file,
          })) || [];
          setItems([...urls, ...files]);
          setHasSavedPortfolio(true);
        } else {
          setHasSavedPortfolio(false);
        }
      } catch (error) {
        console.error("포트폴리오 데이터 불러오기 실패:", error);
      }
    };

    fetchPortfolio();
  }, []);

  const handleAddItem = (type) => {
    if (type === "url") {
      setItems([...items, { id: Date.now(), type, value: "" }]);
    }
  };

  const handleItemChange = (id, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const handleRemoveItem = (itemToRemove) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 100 * 1024 * 1024; 

    const oversizedFiles = files.filter((file) => file.size > maxFileSize);

    if (oversizedFiles.length > 0) {
      alert("파일 크기는 최대 100MB까지 업로드 가능합니다.");
      return;
    }

    try {
      const uploadedFiles = await uploadFiles(files); 
      const newFiles = uploadedFiles.map((url) => ({
        id: Date.now() + Math.random(),
        type: "file",
        value: url, 
      }));
      setItems([...items, ...newFiles]);
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드 중 문제가 발생했습니다.");
    }
  };

  const handleSavePortfolio = async () => {
    const profileData = {
      type: "PORTFOLIO",
      data: {
        urls: items.filter((item) => item.type === "url").map((item) => item.value),
        files: items.filter((item) => item.type === "file").map((item) => item.value),
      },
      order,
    };

    try {
      await addProfile(profileData);
      alert("포트폴리오가 성공적으로 저장되었습니다!");
      setHasSavedPortfolio(true);
      onSave && onSave("portfolio", true);
    } catch (error) {
      console.error("포트폴리오 저장 실패:", error);
      alert("포트폴리오 저장 중 문제가 발생했습니다.");
    }
  };

  const handleUpdatePortfolio = async () => {
    const profileData = {
      type: "PORTFOLIO",
      data: {
        urls: items.filter((item) => item.type === "url").map((item) => item.value),
        files: items.filter((item) => item.type === "file").map((item) => item.value),
      },
      order,
    };

    try {
      await updateProfile(profileData);
      alert("포트폴리오가 성공적으로 수정되었습니다!");
      onSave && onSave("portfolio", true);
    } catch (error) {
      console.error("포트폴리오 수정 실패:", error);
      alert("포트폴리오 수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">포트폴리오</h2>

      <PortfolioItems
        items={items.filter((item) => item.type === "url")}
        type="url"
        handleAddItem={() => handleAddItem("url")}
        handleItemChange={handleItemChange}
        handleRemoveItem={handleRemoveItem}
      />

      <PortfolioItems
        items={items.filter((item) => item.type === "file")}
        type="file"
        handleAddItem={() => {}}
        handleItemChange={handleItemChange}
        handleRemoveItem={handleRemoveItem}
        handleFileUpload={handleFileUpload}
      />

      <div className="flex justify-end space-x-4 mt-4">
        {!hasSavedPortfolio ? (
          <button
            onClick={handleSavePortfolio}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        ) : (
          <button
            onClick={handleUpdatePortfolio}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioForm;
