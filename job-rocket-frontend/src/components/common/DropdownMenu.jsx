import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getUserNicknameAndId } from "../../api/user/UserApi";

const DropdownMenu = ({ isOpen, onClose, onNavigate }) => {
  const [userInfo, setUserInfo] = useState({ nickname: "", id: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const fetchUserProfile = async () => {
        try {
          const data = await getUserNicknameAndId();
          setUserInfo({ nickname: data.nickname, id: data.id });
        } catch (error) {
          setUserInfo({ nickname: "Error", id: null });
        }
      };
      fetchUserProfile();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-14 right-6 w-[160px] h-[240px] bg-white rounded-2xl border border-[#dad0d0] shadow-md"
      onMouseLeave={onClose}
    >
      <div className="w-full h-8 mt-2 text-center text-black text-base overflow-hidden text-ellipsis whitespace-nowrap">
        {userInfo.nickname}
      </div>
      <button
        className="w-full h-8 mt-2 text-center text-[#3f83f8] text-xl"
        onClick={() => navigate(`/member/mypage/${userInfo.id}`)}
      >
        마이페이지
      </button>
      <button
        className="w-full h-8 mt-2 text-center text-black text-xl"
        onClick={() => navigate("/note")}
      >
        쪽지함
      </button>
      <button
        className="w-full h-8 mt-2 text-center text-black text-xl"
        onClick={() => navigate("/retrospect")}
      >
        회고
      </button>
      <div className="w-full border-t border-[#dad0d0] mt-3 "></div>
      <button
        className="w-full h-8 mt-4 text-center text-red-500 text-xl"
        onClick={() => onNavigate("logout")}
      >
        로그아웃
      </button>
    </div>
  );
};

export default DropdownMenu;
