import { useEffect, useState } from "react"

export const useCurrentUrl = () => {
  // const [pid, setPid] = useState("");
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  const listenToPopstate = () => {
    const winPath = window.location.href;
    setCurrentUrl(winPath);
  };
  const getPID = () => {
    var _scripts = document.getElementsByTagName('script');
    var filteredScript = _scripts?.find((item) => {
      const src = item.getAttribute('src');

      return src.includes('mymanager-notification-widget.netlify.app');
      
    });

    if (!filteredScript) return null;

    return new URL(filteredScript.getAttribute('src')).searchParams.get('acc');
  }
  
  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);

  console.log("filteredScript ===>", getPID)
  const pid = null;

  return { pid, currentUrl };
}
