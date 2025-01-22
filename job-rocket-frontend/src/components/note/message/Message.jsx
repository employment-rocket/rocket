const Message = ({ message }) => {
    return (
        <div
            className={`flex items-end ${message.isOwn ? "justify-end" : "justify-start"
                } mb-2`}
        >
            {message.isOwn && (
                <span className="mr-2 text-xs text-gray-600 self-end">
                    {message.time}
                </span>
            )}
            <div
                className={`p-3 rounded-lg shadow max-w-xs whitespace-pre-wrap ${message.isOwn
                    ? "bg-yellow-200 text-black"
                    : "bg-white text-gray-800 border border-gray-300"
                    }`}
            >
                {message.text}
            </div>
            {!message.isOwn && (
                <span className="ml-2 text-xs text-gray-500 self-end">
                    {message.time}
                </span>
            )}
        </div>
    );
};

export default Message;
