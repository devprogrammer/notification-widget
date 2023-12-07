import GoogleMapReact from 'google-map-react';


export const NotificationWrapper = ({item, pos}) => {

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
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
  )
}