import Chat from "./Chat";

const ChatBox = ({ onSelectChat }) => {
    const chats = [
        { id: 1, title: "용감한 보라색 다람쥐", lastChat: "채용 공고 떴나요?", unread: 1, time: "오후 7:28" },
        { id: 2, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 3, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 4, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 5, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 6, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 7, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 8, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 9, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 10, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 11, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 12, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
        { id: 13, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
    ];

    return (
        <div className="max-h-[70vh] overflow-y-auto">
            <hr className="border-gray-300 mb-4" />
            <div>
                {chats.map((chat) => (
                    <Chat key={chat.id} chat={chat} onClick={() => onSelectChat(chat)} />
                ))}
            </div>
        </div>
    );
};

export default ChatBox;
