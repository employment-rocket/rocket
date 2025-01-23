import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile, uploadFile, fetchFile } from "../../../api/profile/ProfileAPI";
import PortfolioItems from "../profileCommon/PortfolioItems";
import { usePortfolio } from "./usePortfolio";

const PortfolioForm = ({ order, onSave }) => {
  const {
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
  } = usePortfolio(order);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">포트폴리오</h2>
      <PortfolioItems
        items={items}
        handleFileUpload={handleFileUpload}
        handleItemChange={handleItemChange}
        handleRemoveItem={(itemToRemove) => {
          setItems((prevItems) => prevItems.filter((item) => item.id !== itemToRemove.id));
        }}
        handleAddItem={handleAddItem}
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
