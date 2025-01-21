import React, { useState } from "react";
import ChatBox from "../note/notelist/ChatBox";
import MessageBox from "../note/message/MessageBox";
import closeIcon from "../../assets/delete.png";

const ChatModal = ({ onClose }) => {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="absolute top-14 right-2 bg-white rounded-lg shadow-lg w-[400px] h-[70vh] flex flex-col border border-gray-300 z-50">
            <div className="flex justify-between items-center p-3 border-b">
                <h2 className="text-sm font-bold">채팅</h2>
                <img
                    src={closeIcon}
                    alt="닫기"
                    className="h-4 w-4 cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="flex-1 overflow-hidden">
                {selectedChat ? (
                    <MessageBox chat={selectedChat} onClose={() => setSelectedChat(null)} />
                ) : (
                    <ChatBox onSelectChat={(chat) => setSelectedChat(chat)} />
                )}
            </div>
        </div>
    );
};

export default ChatModal;
