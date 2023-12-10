import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import { getLatLng } from '../utils/functions';
import { 
  mymanagerTextContent, 
  mymanagerWidgetBody, 
  mymanagerWidgetContainer, 
  mymanagerTruncate, 
  mymanagerMapbox,
  mymanagerTitle,
  mymanagerEventContent,
  mymanagerCompany
} from './notificatio.css';


export const NotificationWrapper = ({settings, notification}) => {
  const [info, setInfo] = useState(null)
  const [pos, setPos] = useState(null)

  useEffect(() => {
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

  const apiIsLoaded = (map, maps) => {
    // console.log("==map===", map)
    // console.log("==maps===", maps)
  }
  
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  if (!info) return <></>
  return (
    <div style={mymanagerWidgetContainer}>
      <div style={mymanagerWidgetBody}>
        <div style={mymanagerMapbox}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBUSVulzSzbfl45dgmM8lWUQanfMz4Fb9o" }}
            defaultCenter={pos}
            defaultZoom={11}
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            style={{borderRadius: "50%"}}
          >
            <AnyReactComponent
              lat={pos.lat}
              lng={pos.lng}
              // text={() => initializeCurrent(pos.lat, pos.lng)}
              text="city"
            />
          </GoogleMapReact>
        </div>
        <div style={{...mymanagerTextContent, ...mymanagerTruncate}}>
          <span style={{...mymanagerTitle, ...mymanagerTruncate}}>{info.header}</span>
          <span style={{...mymanagerEventContent, ...mymanagerTruncate}}>{info.body}</span>
          <span style={{...mymanagerCompany, ...mymanagerTruncate}}>{info.footer}</span>
        </div>
      </div>
    </div>
  )
}