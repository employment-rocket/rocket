import Chat from "./Chat";

const ChatBox = ({ onSelectChat }) => {
    const chats = [
        { id: 1, title: "용감한 보라색 다람쥐", lastChat: "채용 공고 떴나요?", unread: 1, time: "오후 7:28" },
        { id: 2, title: "밝은 파란색 코뿔소", lastChat: "그거 홈페이지에서 확인하시면 될 거예요", unread: 0, time: "오후 7:18" },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center">쪽지함</h2>
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
