import { useEffect, useState } from 'react';
import { getNotification } from './utils/api/getInfo';
import logo from './assets/imgs/company_logo.png';
import './App.css';

function App(props) {
  const  {symbol} = props
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
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (show)
        setShow(!show)
    }, 10000);
  }, [notifications])

  // if (!show) return <></>
  return (
    <>
      {
        notifications && notifications.length > 0 && notifications?.map((n, i) => {
          if (!n.status && show) 
            return (
              <div className="flex justify-between border border-1 shadow rounded-full gap-[12px] p-[4px] mt-[16px]" key={i}>
                <img src={logo} className="rounded-full" alt="logo" width={78} height={78}/>
                <div className='flex flex-1 flex-col truncate'>
                  <h2 className='truncate font-[600]'>{n.type.toUpperCase()}</h2>
                  <p className='truncate size-[14px]'>{n?.msg || `VISITORS: ${n?.message_visitors}`}</p>
                  <p className='truncate font-[600] text-[12px]'>BY www.mymanager.com</p>
                </div>
              </div>
            )
        })
      }
    </>
  );
}

export default App;
