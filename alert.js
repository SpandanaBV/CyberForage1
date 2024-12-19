// ALERT MODULE
const alertModule = {
  alertData: {
    alert_type: "disaster",
    disaster_type: "earthquake",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    message: "An earthquake has occurred in your area. Please take immediate safety precautions.",
    timestamp: new Date().toISOString(),
    user_contact: {
      email: "user@example.com",
      phone: "+1234567890",
    },
  },

  // Function to send alert via API
  async sendAlert(alertData) {
    try {
      const response = await fetch("https://api.example.com/send-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alertData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Alert sent successfully:", data);
    } catch (error) {
      console.error("Failed to send alert:", error);
    }
  },
};

// GEOLOCATION MODULE
const geolocationModule = {
  // Function to check if a user is within the disaster zone
  isUserInZone(userLocation, disasterLocation, radiusKm) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const { latitude: lat1, longitude: lon1 } = userLocation;
    const { latitude: lat2, longitude: lon2 } = disasterLocation;

    const earthRadiusKm = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance <= radiusKm;
  },
};

// UI MODULE
const uiModule = {
  // Function to show an alert in the browser
  showAlert(message) {
    const alertBox = document.getElementById("alertBox");
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    alertBox.style.display = "block";
  },

  // Function to trigger a browser notification
  async triggerPushNotification(message) {
    if ("Notification" in window && navigator.serviceWorker) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        navigator.serviceWorker.register("/sw.js").then((registration) => {
          registration.showNotification("Disaster Alert", {
            body: message,
            icon: "/alert-icon.png",
            tag: "disaster-alert",
          });
        });
      }
    }
  },
};

// MAIN APPLICATION LOGIC
(async function main() {
  // Example user location
  const userLocation = { latitude: 34.0522, longitude: -118.2437 };
  const disasterLocation = alertModule.alertData.location;
  const radiusKm = 50; // 50 km radius for the disaster zone

  if (geolocationModule.isUserInZone(userLocation, disasterLocation, radiusKm)) {
    console.log("User is in the disaster zone, sending alert...");
    
    // Show alert on the UI
    uiModule.showAlert(alertModule.alertData.message);
    
    // Trigger browser push notification
    await uiModule.triggerPushNotification(alertModule.alertData.message);
    
    // Send alert via API
    alertModule.sendAlert(alertModule.alertData);
  } else {
    console.log("User is outside the disaster zone.");
  }
})();
