import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';


export const NotificationWrapper = ({notifications, pos}) => {

  const [show, setShow] = useState(false);

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const EmptyContainer = (<></>)
  const NotificationContainer = (item) => (
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
          <h2 className='mymanager-title mymanager-truncate'>{item.type.toUpperCase()}</h2>
          <p className='mymanager-event-content mymanager-truncate'>{item?.msg || `VISITORS: ${item?.message_visitors}`}</p>
          <p className='mymanager-company mymanager-truncate'>BY www.mymanager.com</p>
        </div>
      </div>
    </div>
  )

 
  notifications.filter((item) => item.status)?.map((_n) => NotificationContainer(_n))
}