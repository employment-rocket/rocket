import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updatePublicStatus, getProfile } from "../../../api/profile/ProfileAPI";

const SidebarToggle = ({ label }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchProfileStatus = async () => {
      try {
        const profile = await getProfile();
        setIsActive(profile?.public ?? false);
      } catch (error) {
        console.error("프로필 상태를 가져오는 데 실패했습니다:", error.message);
      }
    };

    fetchProfileStatus();
  }, []);

  const handleToggle = async () => {
    try {
      const newStatus = !isActive;
      await updatePublicStatus(newStatus);
      setIsActive(newStatus);
    } catch (error) {
      console.error("프로필 상태 업데이트 실패:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${isActive ? "text-gray-700 font-bold" : "text-gray-400"}`}>
        {label}
      </span>
      <button
        onClick={handleToggle}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${
          isActive ? "bg-indigo-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform ${
            isActive ? "translate-x-5" : ""
          }`}
        ></div>
      </button>
    </div>
  );
};

SidebarToggle.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SidebarToggle;
