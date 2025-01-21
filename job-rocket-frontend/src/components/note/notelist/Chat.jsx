const Chat = ({ chat, onClick }) => {
    return (
        <div
            className="flex justify-between items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center">
                <img
                    src="/assets/profile-placeholder.png"
                    alt="profile"
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <div className="font-bold text-lg">{chat.title}</div>
                    <div className="text-base text-gray-600">{chat.lastChat}</div>
                </div>
            </div>
            <div className="flex items-center">
                {chat.unread > 0 && (
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full mr-2">
                        {chat.unread}
                    </span>
                )}
                <span className="text-gray-600 text-base">{chat.time}</span>
            </div>
        </div>
    );
};

export default Chat;
