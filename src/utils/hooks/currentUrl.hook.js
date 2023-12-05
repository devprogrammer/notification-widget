import { useEffect, useRef, useState } from "react"

export const useCurrentUrl = () => {
  const urlRef = useRef('');
  const [url, SetUrl] = useState("");
  
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
    const observer = new MutationObserver((mutationsList) => {
      // for(let mutation of mutationsList){
      //   if (mutation.target.getElementsByTagName("input").length > 0) {
      //     const inputFields = mutation.target.getElementsByTagName("input")
      //     for (let input of inputFields) {
      //       const value = input.value
      //       console.log("====input =====", input)
      //       console.log("===input values ====", value);
      //     }
      //   }
      // }
      if (window.location.href !== url) {
        SetUrl(window.location.href);
      }
      // if (window.location.href !== urlRef.current) {
      //   urlRef.current = window.location.href;
      // }
    });
  
    const config = {subtree: true, childList: true};
    observer.observe(document, config);
    return () => {
      observer.disconnect();
    };
  }, []);

  const pid = getPID(); //maybe this?
  console.log("curr url ====>", url)

  return { pid, currentUrl: url };
}
