// Notification utilities with fallbacks
export interface NotificationOptions {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  email?: string;
  phone?: string;
}

// Check if notifications are enabled
export const isNotificationsEnabled = () => {
  return import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true';
};

// Send notification with multiple fallbacks
export const sendNotification = async (options: NotificationOptions) => {
  const results = {
    push: false,
    email: false,
    sms: false,
    browser: false
  };

  // Try browser notification first
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(options.title, {
        body: options.message,
        icon: '/favicon.ico'
      });
      results.browser = true;
    }
  } catch (error) {
    console.warn('Browser notification failed:', error);
  }

  // Try push notification if enabled
  if (isNotificationsEnabled()) {
    try {
      results.push = await sendPushNotification(options);
    } catch (error) {
      console.warn('Push notification failed:', error);
    }

    // Try email notification if email provided
    if (options.email) {
      try {
        results.email = await sendEmailNotification(options);
      } catch (error) {
        console.warn('Email notification failed:', error);
      }
    }

    // Try SMS notification if phone provided
    if (options.phone && import.meta.env.VITE_ENABLE_SMS === 'true') {
      try {
        results.sms = await sendSMSNotification(options);
      } catch (error) {
        console.warn('SMS notification failed:', error);
      }
    }
  }

  return results;
};

// Push notification implementation
const sendPushNotification = async (options: NotificationOptions): Promise<boolean> => {
  try {
    // In a real implementation, this would use Firebase Cloud Messaging
    // For now, just log the attempt
    console.log('Push notification would be sent:', options);
    return true;
  } catch (error) {
    console.warn('Push notification error:', error);
    return false;
  }
};

// Email notification implementation
const sendEmailNotification = async (options: NotificationOptions): Promise<boolean> => {
  try {
    const response = await fetch('/api/notifications/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    return response.ok;
  } catch (error) {
    console.warn('Email notification error:', error);
    return false;
  }
};

// SMS notification implementation
const sendSMSNotification = async (options: NotificationOptions): Promise<boolean> => {
  try {
    const response = await fetch('/api/notifications/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    return response.ok;
  } catch (error) {
    console.warn('SMS notification error:', error);
    return false;
  }
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
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