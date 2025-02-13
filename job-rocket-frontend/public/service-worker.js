self.addEventListener("push", function (event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: "/icon.png",
        data: {
            url: data.url
        }
    };
    self.registration.showNotification(data.title, options);
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close(); 

    const url = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: "window" }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes(url) && "focus" in client) {
                    return client.focus();
                }
            }
            console.log("Opening new window with URL:", url);
            return clients.openWindow(url);
        })
    );
});
