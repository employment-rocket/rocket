import api from "../api";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WEBSOCKET_URL = `${import.meta.env.VITE_API_BASE_URL}/ws`;

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    stompClient = new Client({
        webSocketFactory: () => new SockJS(WEBSOCKET_URL),
        reconnectDelay: 5000,
        onConnect: () => {
            stompClient.subscribe("/user/queue/messages", (message) => {
                if (onMessageReceived) {
                    const parsedMessage = JSON.parse(message.body);
                    onMessageReceived(parsedMessage);
                }
            });
        },
        onStompError: (frame) => {
            console.error("STOMP error:", frame.headers["message"], frame.body);
        },
    });

    stompClient.activate();
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};

export const sendMessageViaWebSocket = (receiverName, content) => {
    if (stompClient && stompClient.connected) {
        const message = { receiverName, content };
        stompClient.publish({
            destination: "/ws/send",
            body: JSON.stringify(message),
        });
    } else {
        console.error("WebSocket is not connected.");
    }
};

export const sendMessage = async (receiverName, content) => {
    try {
        const response = await api.post("/notes", null, {
            params: { receiverName },
            data: content,
        });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

export const getConversations = async () => {
    try {
        const response = await api.get("/notes/conversations");
        return response.data;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        throw error;
    }
};

export const getMessages = async (conversationId, page, size) => {
    try {
        const response = await api.get("/notes/messages", {
            params: { conversationId, page, size },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};

export const markMessageAsRead = async (noteId) => {
    try {
        await api.post(`/notes/read/${noteId}`);
    } catch (error) {
        console.error("Error marking message as read:", error);
        throw error;
    }
};
