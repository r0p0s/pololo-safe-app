/**
 * Requests permission from the user to send notifications.
 * @returns {Promise<boolean>} True if permission was granted, false otherwise.
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn("This browser does not support desktop notification");
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

/**
 * Sends a local browser notification.
 * @param {string} title - The notification title
 * @param {string} body - The notification body text
 * @param {string} icon - URL to the notification icon (optional)
 */
export const sendLocalNotification = (title, body, icon = '/favicon.svg') => {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon
      });
    } catch (e) {
      // Fallback for mobile browsers that require ServiceWorker registration to show notifications
      if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, { body, icon });
        }).catch(err => console.error("Error showing notification:", err));
      }
    }
  }
};
