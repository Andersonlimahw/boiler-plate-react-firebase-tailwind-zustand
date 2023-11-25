import { MessagePayload, NotificationPayload } from "firebase/messaging";
import { requestForToken, onMessageListener } from "./firebaseNotification"
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const FirebaseNotifications = () => {
  const [notification, setNotification] = useState<NotificationPayload>();

  function ToastDisplay() {
    return (
      <div>
        <p><strong>{notification?.title}</strong></p>
        <p>{notification?.body}</p>
        <span>
          {notification?.image && (
            <img
              src={notification.image}
              alt={notification.title}
            />)
          }
        </span>
      </div>
    );
  };
  const notify = () => toast(<ToastDisplay />, { type: 'success' });

  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload: MessagePayload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body
      });
    })
    .catch((err) => console.log('onMessageListener: failed: ', err));

  return (
    <ToastContainer />
  )
}

export default FirebaseNotifications;