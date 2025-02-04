// self.addEventListener("push", function (event) {
//     const data = event.data.json();
//     self.registration.showNotification(data.title, {
//         body: data.body,
//         icon: "/icon.png",
//     });
//     self.registration.showNotification(data.title, options);
// });


// self.addEventListener("notificationclick", function (event) {
//     event.notification.close(); // 알림 닫기

//     event.waitUntil(
//         clients.matchAll({ type: "window" }).then(clientList => {
//             for (const client of clientList) {
//                 if (client.url.includes("/schedule") && "focus" in client) {
//                     return client.focus(); // 이미 열려 있으면 해당 창으로 이동
//                 }
//             }
//             return clients.openWindow(event.notification.data.url); // 새 창 열기
//         })
//     );
// });
self.addEventListener("push", function (event) {
    console.log("drjawd")
    const data = event.data.json();
    console.log("Push event received: ", data);  // 전체 데이터 확인
    const options = {
        body: data.body,
        icon: "/icon.png",
        data: {
            url: data.url  // 알림 클릭 시 사용할 URL을 data에 저장
        }
    };
    self.registration.showNotification(data.title, options);
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close(); // 알림 닫기

    const url = event.notification.data.url; // 알림 데이터에서 URL 추출
    console.log("Notification clicked, URL:", url); // 클릭된 URL 확인

    event.waitUntil(
        clients.matchAll({ type: "window" }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes(url) && "focus" in client) {
                    return client.focus(); // 이미 해당 URL이 열린 창이 있으면 해당 창으로 포커스
                }
            }
            console.log("Opening new window with URL:", url); // 새 창을 열 때 URL 확인
            return clients.openWindow(url); // 새 창으로 해당 URL 열기
        })
    );
});
