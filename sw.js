self.addEventListener('push', function(event) {
    const data = event.data.json();
    const title = data.title || 'Disaster Alert';
    const options = {
      body: data.body,
      icon: '/logo.png',
      badge: '/logo.png',
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  