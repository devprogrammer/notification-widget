import { 
  useEffect, 
  useState, 
  useCallback 
} from 'react';
import { 
  getNotification,
  sendWebsiteData
} from './utils/api/getInfo';
import logo from './assets/imgs/company_logo.png';
import { useScript } from './utils/hooks/script.hook';
import './App.css';

function App() {

  const {pid, currentUrl} = useScript()
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(true);

  const fetchNotification = async() => {
    const res = await getNotification("r")
    const { data } = res.data;
    const { notification } = data;

    if (Object.keys(notification).length > 0) {
      const _n = Object.keys(notification).map((key, index) => {
        if (typeof notification[key] === 'object') {
          return notification[key]          
        }
      })
      const _n_filter = _n.filter((item) => item !== undefined);
      setNotifications([...notifications, ..._n_filter])
    }
  }

  const sendData = useCallback(async() => {
    if (!!pid) {
      const data = {
        pid,
        url: currentUrl
      }
      console.log("====data====", data)
      await sendWebsiteData(data)
    }
  }, [currentUrl, pid])

  useEffect(() => {
    sendData()
  }, [sendData])

  useEffect(() => {
    fetchNotification();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (show)
        setShow(!show)
        
    }, 10000);
  }, [notifications])

  // if (!show) return <></>
  return (
    <div className='mymanager-widget-container'>
      {
        notifications && notifications.length > 0 && notifications?.map((n, i) => {
          if (n.status) 
            return (
              <div className="mymanager-widget-body" key={i}>
                <img src={logo} className="mymanager-rounded-full" alt="logo" width={78} height={78}/>
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
