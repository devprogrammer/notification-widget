import { useEffect, useState } from 'react';
import { getNotification } from './utils/api/getInfo';
import logo from './assets/imgs/company_logo.png';
import './App.css';

function App() {
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
  useEffect(() => {
    fetchNotification();
    // 
    console.log('url', document.currentScript.getAttribute('src'))
    var acc = new URL(document.currentScript.getAttribute('src')).searchParams.get("acc");
    console.log('acc =====>', acc);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (show)
        setShow(!show)
        console.log("====", notifications)
    }, 10000);
  }, [notifications])

  // if (!show) return <></>
  return (
    <div className='absolute w-90 bottom-8 left-4'>
      {
        notifications && notifications.length > 0 && notifications?.map((n, i) => {
          if (!n.status) 
            return (
              <div className="flex justify-between border shadow rounded-full gap-3 p-2 mt-4 z-[1000]" key={i}>
                <img src={logo} className="rounded-full" alt="logo" width={78} height={78}/>
                <div className='flex flex-1 flex-col gap-2 truncate'>
                  <h2 className='truncate text-20 font-600'>{n.type.toUpperCase()}</h2>
                  <p className='truncate text-14'>{n?.msg || `VISITORS: ${n?.message_visitors}`}</p>
                  <p className='truncate font-600 text-12'>BY www.mymanager.com</p>
                </div>
              </div>
            )
        })
      }
    </div>
  );
}

export default App;
