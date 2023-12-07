import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';


export const NotificationWrapper = ({notifications, pos}) => {

  const [show, setShow] = useState(false);
  const [notiArr, setNotiArr] = useState([])
  const [shownAlert, setShownAlert] = useState(null)

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const EmptyContainer = (<></>)
  // const NotificationContainer = (item) => (
  //   <div className='mymanager-widget-container'>
  //     <div className="mymanager-widget-body">
  //       <div className="mymanager-mapbox">
  //         <GoogleMapReact
  //           bootstrapURLKeys={{ key: "AIzaSyBVrhAX-Kht3yDvmUCQHqMSeB1Qd7XVFq8" }}
  //           defaultCenter={pos}
  //           defaultZoom={11}
  //           // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
  //         >
  //           <AnyReactComponent
  //             lat={pos.lat}
  //             lng={pos.lng}
  //             text="My Marker"
  //           />
  //         </GoogleMapReact>
  //       </div>
  //       <div className='mymanager-text-content mymanager-truncate'>
  //         <h2 className='mymanager-title mymanager-truncate'>{item.type.toUpperCase()}</h2>
  //         <p className='mymanager-event-content mymanager-truncate'>{item?.msg || `VISITORS: ${item?.message_visitors}`}</p>
  //         <p className='mymanager-company mymanager-truncate'>BY www.mymanager.com</p>
  //       </div>
  //     </div>
  //   </div>
  // )

  useEffect(() => {
    setNotiArr([...notifications].filter(item => item.status))
  }, [notifications])

  useEffect(() => {
    setInterval(() => {
      setShownAlert(notiArr[0])
      if (notiArr.length < 1)
        return () => clearInterval();
      setNotiArr([...notiArr].slice(1, notiArr.length))
    }, 3000)
    console.log("==noarr ====", shownAlert)
  }, [])

  if (!shownAlert) return <></>
  return (
    <div className='mymanager-widget-container'>
      <div className="mymanager-widget-body">
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
          <h2 className='mymanager-title mymanager-truncate'>{shownAlert.type.toUpperCase()}</h2>
          <p className='mymanager-event-content mymanager-truncate'>{shownAlert?.msg || `VISITORS: ${shownAlert?.message_visitors}`}</p>
          <p className='mymanager-company mymanager-truncate'>BY www.mymanager.com</p>
        </div>
      </div>
    </div>
  )
}