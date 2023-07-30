import React, { useEffect, useState } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import { NotificationItem, chainNameType, SubscribedModal, ENV } from "@pushprotocol/uiweb";
import { useAddress } from "@thirdweb-dev/react";

const Notification = () => {
  const address = useAddress();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await PushAPI.user.getFeeds({
        user: `eip155:42:${address}`, // user address in CAIP
        env: ENV.STAGING,
      });
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, [address]);

  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    // Show notifications one by one with a delay
    const delay = 3000; // Duration to show each notification in milliseconds

    const showNextNotification = () => {
      if (notifications.length > 0) {
        const [nextNotification, ...remainingNotifications] = notifications;
        setVisibleNotifications((prevNotifications) => [...prevNotifications, nextNotification]);

        setTimeout(() => {
          setVisibleNotifications((prevNotifications) => prevNotifications.slice(1));
          showNextNotification();
        }, delay);
      }
    };

    showNextNotification();
  }, [notifications]);

  const theme = ""; // Add your desired theme here

  return (
    <>
      {visibleNotifications.map((notification, i) => {
        const {
          cta,
          title,
          message,
          app,
          icon,
          image,
          url,
          blockchain,
          secret,
        } = notification;

        return (
          <NotificationItem
            key={`notif-${i}`}
            notificationTitle={secret ? notification["title"] : title}
            notificationBody={secret ? notification["body"] : message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
            theme={theme}
            chainName={blockchain as chainNameType}
          />
        );
      })}
    </>
  );
};

export default Notification;