import { useEffect, useState } from "react"

export const useScript = () => {
  const [script, setScript] = useState(null)

  useEffect(() => {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[0];
    if (!currentScript) return;

    let result = currentScript.src; 
    const urlParams = new URL(result).searchParams;
    const myParam = urlParams.get('acc'); 
  })
}