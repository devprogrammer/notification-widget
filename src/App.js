import { 
  useEffect, 
  useState, 
  useCallback 
} from 'react';

import { 
  getNotification,
  sendWebsiteData
} from './utils/api/getInfo';
import { useCurrentUrl } from './utils/hooks/currentUrl.hook';
import './App.css';
import { filterActiveNotifications } from './utils/functions';
import { NotificationWrapper } from './components/notification';

function App() {
  const {pid, currentUrl} = useCurrentUrl()
  const [pos, setPos] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotification = useCallback(async() => {
    if (!!pid === false)
      return;

    const res = await getNotification(pid)
    const { data } = res.data;
    const n_info = filterActiveNotifications(data, currentUrl)
  
    if (!n_info) return;
    const notification = n_info.notification;

    if (Object.keys(notification).length < 1)
      return;
    
    const _n = Object.keys(notification).map((key) => {
      if (typeof notification[key] === 'object') {
        return notification[key]          
      }
    })
    const _n_filter = _n.filter((item) => item !== undefined);
    setNotifications([...notifications, ..._n_filter])
  }, [currentUrl, pid])
  
  // send data to mymanager server
  const sendData = useCallback(async() => {
    console.log("*-****-*", currentUrl)
    if (!!pid) {
      const data = {
        pid,
        url: currentUrl,
        originUrl: window.location.origin,
        position: pos.toString()
      }
      console.log("=*==data==*=", data)
      await sendWebsiteData(data)
    }
  }, [currentUrl, pid])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var _pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }; 
        setPos({..._pos}) 
      })
    }
    sendData()
  }, [sendData])
  
  useEffect(() => {
    fetchNotification();
  }, [fetchNotification])

  if (notifications.length < 1) return <></>
  return (
    <NotificationWrapper notifications={notifications} pos={pos} />
  );
}

export default App;
