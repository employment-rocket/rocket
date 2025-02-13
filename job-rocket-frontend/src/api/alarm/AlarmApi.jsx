import { useEffect, useState } from "react";

const useSSE = () => {
    const [messages, setMessages] = useState([]);
    const accessToken = localStorage.getItem('AccessToken');

    if(accessToken){
    useEffect(() => {

      const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/alarm/sse?token=${accessToken}`,{
        withCredentials:true
      }
      );
      
      console.log("eventSource: ", eventSource);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data); 
          setMessages((prev) => [...prev, data]);
          console.log("받아온 메시지: ", data);

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
}
  export default useSSE;