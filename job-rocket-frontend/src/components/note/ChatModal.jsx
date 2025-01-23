import React, { useState, useEffect, useContext } from "react";
import ChatBox from "../note/notelist/ChatBox";
import MessageBox from "../note/message/MessageBox";
import { AuthContext } from "../../context/auth/AuthContext";
import { getConversations } from "../../api/note/NoteApi";

const ChatModal = ({ onClose }) => {
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const { isAuthenticated } = useContext(AuthContext);

    const fetchConversations = async () => {
        try {
            const response = await getConversations();
            setConversations(response || []);
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchConversations();
        }
    }, [isAuthenticated]);

    return (
        <div className="absolute top-14 right-2 bg-white rounded-lg shadow-lg w-[400px] h-[70vh] flex flex-col border border-gray-300 z-50">
            <div className="flex justify-between items-center p-3 border-b">
                <h2 className="text-sm font-bold">채팅</h2>
                <button onClick={onClose}>닫기</button>
            </div>
            <div className="flex-1 overflow-hidden">
                {selectedChat ? (
                    <MessageBox
                        chat={selectedChat}
                        onClose={() => setSelectedChat(null)}
                    />
                ) : (
                    <ChatBox
                        chats={conversations}
                        onSelectChat={(chat) => setSelectedChat(chat)}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatModal;
