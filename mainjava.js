if ("Notification" in window && navigator.serviceWorker) {
    // Register service worker
    navigator.serviceWorker.register("sw.js")
      .then(function (registration) {
        console.log("Service Worker registered successfully:", registration);

        // Request permission for notifications
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            console.log("Notification permission granted.");

            // Subscribe to push notifications
            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: "<Your-VAPID-Public-Key>"  // Replace with your VAPID Public Key
            }).then(function (subscription) {
              console.log("User is subscribed:", subscription);

              // Send the subscription to your server (optional)
              fetch('/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription)
              });
            }).catch(function (error) {
              console.error("Error during subscription:", error);
            });
          } else {
            console.log("Notification permission denied.");
          }
        });
      }).catch(function (error) {
        console.error("Service Worker registration failed:", error);
      });
  } else {
    console.log("Notifications are not supported in this browser.");
  }