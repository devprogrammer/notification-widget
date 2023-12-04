import { useEffect, useState } from "react"

export const useCurrentUrl = () => {
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  const listenToPopstate = () => {
    const winPath = window.location.href;
    setCurrentUrl(winPath);
  };

  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);

  return currentUrl;
}
