import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { getLatLng } from '../utils/functions';


export const NotificationWrapper = ({settings, notification}) => {
  const [info, setInfo] = useState(null)
  const [pos, setPos] = useState(null)

  useEffect(() => {
    if (!notification) 
      return;
    const _pos = getLatLng(notification.position)
    if (_pos)
      setPos({..._pos})
    const {recent_activity, live_visitor_activity, hot_stake_activity} = settings;
    if (recent_activity.status) {
      const newMsg = {
        header: `${Math.floor(Math.random()*100)} from ${notification.position}`,
        body: recent_activity.msg,
        footer: `Visited ${notification.website}`
      }
      setInfo({...newMsg})
    } 
    else if(live_visitor_activity.status) {
      const newMsg = {
        header: `${Math.floor(Math.random()*100)} from ${notification.position}`,
        body: recent_activity.msg,
        footer: `Visited ${notification.website}`
      }
      setInfo({...newMsg})
    }
    else if (hot_stake_activity.status) {
      const newMsg = {
        header: `${Math.floor(Math.random()*100)} from ${notification.position}`,
        body: recent_activity.msg,
        footer: `Visited ${notification.website}`
      }
      setInfo({...newMsg})
    }
  }, [notification])
  
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  if (!info) return <></>
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
          {/* <h2 className='mymanager-title mymanager-truncate'>{_n.type.toUpperCase()}</h2>
          <p className='mymanager-event-content mymanager-truncate'>{_n?.msg || `VISITORS: ${_n?.message_visitors}`}</p>
          <p className='mymanager-company mymanager-truncate'>BY www.mymanager.com</p> */}
          <h2 className='mymanager-title mymanager-truncate'>{info.header}</h2>
          <p className='mymanager-event-content mymanager-truncate'>{info.body}</p>
          <p className='mymanager-company mymanager-truncate'>{info.footer}</p>
        </div>
      </div>
    </div>
  )
}