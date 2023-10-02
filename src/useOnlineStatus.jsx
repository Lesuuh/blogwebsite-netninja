import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      function isOnline() {
        setOnline(true);
      }

      function isOffline() {
        setOnline(false);
      }

      window.addEventListener("online", isOnline());
      window.addEventListener("offline", isOffline());
      return () => {
        window.removeEventListener("online", isOnline());
        window.removeEventListener("offline", isOffline());
      };
    }, 1000);
  }, []);

  return online;
};

export default useOnlineStatus;
