import { useEffect, useState } from "react";
import { checkAndSubscribePush } from "../../api/alarm/AlarmSubscribe.js";

const NotificationHandler = () => {
    const [prevPermission, setPrevPermission] = useState(Notification.permission);
    
    useEffect(() => {
        console.log("noti")
        if (!navigator.permissions) {
            console.warn("브라우저가 permissions API를 지원하지 않음");
            return;
        }

        navigator.permissions.query({ name: "notifications" }).then((permissionStatus) => {
            console.log("현재 알림 권한:", permissionStatus.state);
            permissionStatus.onchange = () => {
                console.log("알림 권한 변경 감지:", permissionStatus.state);
                if (permissionStatus.state === "granted") {
                    checkAndSubscribePush();
                }
            };
        });

    
        return () => {
            console.log("NotificationHandler 언마운트됨");
        };
    }, [prevPermission]);

    return null;
};

export default NotificationHandler;
