import { 
  useEffect, 
  useState, 
  useCallback 
} from 'react';
import GoogleMapReact from 'google-map-react';
import { 
  getNotification,
  sendWebsiteData
} from './utils/api/getInfo';
import { useCurrentUrl } from './utils/hooks/currentUrl.hook';
import './App.css';
import { filterActiveNotifications } from './utils/functions';

function App() {

  const {pid, currentUrl} = useCurrentUrl()
  const [pos, setPos] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(true);

  const fetchNotification = async(pid) => {
    const res = await getNotification(pid)
    const { data } = res.data;
    const n_info = filterActiveNotifications(data, currentUrl)
    
    if (!n_info) return;
    const notification = n_info.notification;

    if (Object.keys(notification).length > 0) {
      const _n = Object.keys(notification).map((key) => {
        if (typeof notification[key] === 'object') {
          return notification[key]          
        }
      })
      const _n_filter = _n.filter((item) => item !== undefined);
      setNotifications([...notifications, ..._n_filter])
    }
  }
  
  // send data to mymanager server
  const sendData = useCallback(async() => {
    if (!!pid) {
      const data = {
        pid,
        url: currentUrl,
        originUrl: window.location.origin,
        position: pos.toString()
      }
      console.log("===data===", data)
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
    pid && fetchNotification(pid);
  }, [])

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  // if (!show) return <></>
  return (
    <div className='mymanager-widget-container'>
      {
        notifications && notifications.length > 0 && notifications?.map((n, i) => {
          if (n.status) 
            return (
              <div className="mymanager-widget-body" key={i}>
                <div className="mymanager-mapbox">
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBVrhAX-Kht3yDvmUCQHqMSeB1Qd7XVFq8" }}
                    defaultCenter={pos}
                    defaultZoom={11}
                    // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                  >
                    <AnyReactComponent
                      lat={pos.lat}
                      lng={pos.lng}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div>
                <div className='mymanager-text-content mymanager-truncate'>
                  <h2 className='mymanager-title mymanager-truncate'>{n.type.toUpperCase()}</h2>
                  <p className='mymanager-event-content mymanager-truncate'>{n?.msg || `VISITORS: ${n?.message_visitors}`}</p>
                  <p className='mymanager-company mymanager-truncate'>BY www.mymanager.com</p>
                </div>
              </div>
            )
        })
      }
    </div>
  );
}

export default App;
