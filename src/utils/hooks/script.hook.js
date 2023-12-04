import { useEffect, useState } from "react"

export const useScript = () => {
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

  const getPID = () => {
    var _script = document.getElementsByTagName('script')[0];
      if (!_script) return;
      const myParam = new URL(_script.src).searchParams.get('acc');
      return myParam
  }

  const pid = getPID()
  return {pid, currentUrl};
}
