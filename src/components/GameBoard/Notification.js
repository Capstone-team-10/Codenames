import React, { useEffect } from "react";

export default function Notification({ message, setVisibility }) {
  useEffect(() => {
    const notificationElem = document.getElementById("notification-container");
    notificationElem.classList.add("popIn");

    setTimeout(() => {
      notificationElem.classList.remove("popIn");
    }, 1000);

    setTimeout(() => {
      setVisibility(false);
    }, 2000);
  });
  return (
    <div id="notification-container" className="notification-container">
      <p>{message}</p>
    </div>
  );
}
