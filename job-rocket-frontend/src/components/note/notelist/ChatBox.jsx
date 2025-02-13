import React from "react";
import Chat from "./Chat";

const ChatBox = ({ chats = [], onSelectChat }) => {
    return (
        <div className="max-h-[70vh] overflow-y-auto">
            <hr className="border-gray-300 mb-4" />
            <div>
                {chats.map((chat) => (
                    <Chat
                        key={chat.conversationId}
                        chat={{
                            id: chat.conversationId,
                            title: chat.otherUserName,
                            lastChat: chat.lastMessage,
                            unread: chat.unreadMessageCount,
                            time: chat.lastMessageTime,
                            profile: chat.otherUserProfile,
                        }}
                        onClick={() => onSelectChat(chat)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatBox;
