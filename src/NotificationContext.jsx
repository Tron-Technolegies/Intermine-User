import { createContext, useContext } from "react";
import useNotifications from "./hooks/notifications/useNotifications";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const notifications = useNotifications();
  return (
    <NotificationContext.Provider value={notifications}>{children}</NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  return useContext(NotificationContext);
}
