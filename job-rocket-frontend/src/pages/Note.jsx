import { useState } from "react";
import ChatBox from "../components/note/notelist/ChatBox";
import MessageBox from "../components/note/message/MessageBox";

const Note = () => {
	const [selectedChat, setSelectedChat] = useState(null);

	return (
		<div
			className="bg-gray-100"
			style={{ height: "calc(100vh - 60px)" }}
		>
			<div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 h-full" style={{ fontFamily: "CookieBold" }} >
				{
					selectedChat ? (
						<MessageBox chat={selectedChat} onClose={() => setSelectedChat(null)} />
					) : (
						<ChatBox onSelectChat={(chat) => setSelectedChat(chat)} />
					)}
			</div>
		</div >
	);
};

export default Note;
