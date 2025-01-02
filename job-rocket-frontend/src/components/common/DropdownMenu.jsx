import React from "react";
import {useNavigate} from "react-router";

const DropdownMenu = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  return (
    <div
      className="absolute top-10 right-0 w-[106px] h-[189px] bg-white rounded-2xl border border-[#dad0d0] shadow-md"
      onMouseLeave={onClose} // 드롭다운을 닫는 동작
    >
      <div className="w-full h-6 mt-2 text-center text-black text-base">
        바위먹는수달
      </div>
      <button
        className="w-full h-6 mt-2 text-center text-[#3f83f8] text-xl"
        onClick={() => navigate("/mypage")}
      >
        마이페이지
      </button>
      <button
        className="w-full h-6 mt-2 text-center text-black text-xl"
        onClick={() => navigate("/note")}
      >
        쪽지함
      </button>
      <button
        className="w-full h-6 mt-2 text-center text-black text-xl"
        onClick={() => navigate("/retrospect")}
      >
        회고
      </button>
      <div className="w-full border-t border-[#dad0d0] "></div>
      <button
        className="w-full h-6 mt-2 text-center text-red-500 text-xl"
        onClick={() => onNavigate("logout")}
      >
        로그아웃
      </button>
    </div>
  );
};

export default DropdownMenu;
