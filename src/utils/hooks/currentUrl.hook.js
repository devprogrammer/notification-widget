import { useEffect, useState } from "react"

export const useCurrentUrl = () => {
  // const [pid, setPid] = useState("");
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  const listenToPopstate = () => {
    const winPath = window.location.href;
    setCurrentUrl(winPath);
  };
  const getPID = () => {
    const _scripts = document.getElementsByTagName('script');
    let widgetJs = null;

    for (let i = 0; i < _scripts.length; i++) {
      const src = _scripts[i].getAttribute('src');

      if(src.includes('mymanager-notification-widget.netlify.app')) {
        widgetJs = _scripts[i];
        break;
      }
    }

    if (!widgetJs) return null;

    return new URL(widgetJs.getAttribute('src')).searchParams.get('acc');
  }
  
  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);

  console.log("filteredScript ===>", getPID())
  const pid = getPID(); //maybe this?

  return { pid, currentUrl };
}
