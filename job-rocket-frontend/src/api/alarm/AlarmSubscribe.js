import api from "../api";

export const subscribeToPushNotifications = async () =>{
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("푸시 알림을 지원하지 않는 브라우저입니다.");
        return;
    }
    try {
        const registration = await navigator.serviceWorker.register("/service-worker.js");
        
        if (!registration.active) {
            console.warn("활성화된 Service Worker가 없습니다.");
            return;
        }

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BC2V1VhI1SWfyGs9OCfJR17zVJ3ishOXPzKLhVFm1HyeSSBdgvNQSfM2nGSyymsOTYiVBBSpIzo5O9IUf1Wssb0",
        });
        await api.post("/alarm/subscribe", subscription);

    } catch (error) {

        console.error("푸시 알림 구독 실패:", error);
        
    }
}


export const checkAndSubscribePush = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("푸시 알림을 지원하지 않는 브라우저입니다.");
        return;
    }

    if (Notification.permission === "granted") {
        try {
            const registration = await navigator.serviceWorker.register("/service-worker.js");
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: "BC2V1VhI1SWfyGs9OCfJR17zVJ3ishOXPzKLhVFm1HyeSSBdgvNQSfM2nGSyymsOTYiVBBSpIzo5O9IUf1Wssb0",
            });
            await api.post("/alarm/subscribe", subscription);
        } catch (error) {
            console.error("푸시 알림 재구독 실패:", error);
        }
    }
};

