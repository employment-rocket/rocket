import { useState, useEffect, useRef } from "react";
import Message from "./Message";

const generateMessages = (startId, count) => {
    return Array.from({ length: count }, (_, index) => ({
        id: startId + index,
        text: `메시지 내용 ${startId + index}`,
        time: `오후 ${6 + Math.floor((startId + index) / 10)}:${25 + ((startId + index) % 10)}`,
        isOwn: (startId + index) % 2 === 0,
    }));
};

const MessageBox = ({ chat, onClose }) => {
    const [messages, setMessages] = useState(() => generateMessages(16, 15));
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;
        const newMsg = {
            id: messages[messages.length - 1]?.id + 1 || 1,
            text: newMessage,
            time: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isOwn: true,
        };
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
        setTimeout(scrollToBottom, 0);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center bg-white text-black p-4 border-b">
                <h2 className="text-sm font-semibold flex-1 text-center">{chat.title}</h2>
                <button
                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                    onClick={onClose}
                >
                    X
                </button>
            </div>
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 bg-[#B1DFFF]"
            >
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <div className="border-t p-2 bg-gray-50">
                <div className="flex items-center">
                    <textarea
                        placeholder="메시지를 입력하세요"
                        className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        rows={1}
                    />
                    <button
                        className="ml-2 bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800"
                        onClick={handleSendMessage}
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
