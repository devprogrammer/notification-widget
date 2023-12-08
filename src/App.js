import socketio from 'socket.io-client';
import { useEffect, useState, useCallback, useContext } from 'react';
import { getNotification, sendWebsiteData } from './utils/api/getInfo';
import { useCurrentUrl } from './utils/hooks/currentUrl.hook';
import './App.css';
import { filterActiveNotifications } from './utils/functions';
import { NotificationWrapper } from './components/notification';

const REACT_APP_API = "http://localhost:5002/api"
const socket = socketio(REACT_APP_API);

function App() {
  const {pid, currentUrl, originUrl} = useCurrentUrl()
  const [pos, setPos] = useState(null);
  const [notification, setNotification] = useState(null)
  const [ntfsetting, setNtfsetting] = useState(null);

  const fetchNotification = useCallback(async() => {
    if (!!pid === false)
      return;

    const res = await getNotification(pid)
    const { data } = res.data;
    const n_info = filterActiveNotifications(data, currentUrl)
  
    if (!n_info) return setNotification(null);
    const _notification = n_info.notification;
    setNtfsetting({..._notification})
  }, [currentUrl, pid])
  
  // send data to mymanager server
  const sendData = useCallback(async() => {
    if (!!pid && pos) {
      const data = {
        pid,
        url: currentUrl,
        originUrl,
        position: `${pos?.lat} + ${pos?.lng}`
      }
      // test socket
      socket.emit('visit-website', data);
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

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////// socket ////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    socket.connect();

    const onAddActivityEvent = (data) => {
      console.log("=**==received=**==", data);
      setNotification({...data})
    }
    socket.on('added-activity', onAddActivityEvent)
    return () => {
      socket.off('added-activity')
    }
  }, [socket])

  console.log("====settings ======", ntfsetting)
  /////////////////////////////////////////////////////////////////////////////
  if (ntfsetting) {
    const {recent_activity, live_visitor_activity, hot_stake_activity} = ntfsetting
    if (!recent_activity.status && !live_visitor_activity.status && !hot_stake_activity.status) {
      return <></>
    } else {
      return (
        <NotificationWrapper settings={ntfsetting} notification={notification}/>
      );
    }
  } 
  
  return <></>
}

export default App;
