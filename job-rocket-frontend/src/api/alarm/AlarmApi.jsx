import api from "../api";

import { useEffect, useState } from "react";

// SSE 연결을 위한 커스텀 훅
const useSSE = () => {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/sse/alarm`,  {
        withCredentials: true
      });
  
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data); // JSON 파싱 추가
          setMessages((prev) => [...prev, data]);
          console.log("받아온 데이터: ", data);
        } catch (error) {
          console.error("Error parsing SSE message:", error);
        }
      };
  
      eventSource.onerror = () => {
        console.error("SSE 연결이 끊어졌습니다.");
        eventSource.close();
      };
  
      return () => eventSource.close();
    }, []);
  
    return messages;
  };
  
  export default useSSE;