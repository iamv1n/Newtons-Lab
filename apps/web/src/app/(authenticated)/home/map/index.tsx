import { APIProvider, Map } from '@vis.gl/react-google-maps';

import GeoMarker from './geocode/index';


interface Position {
  lat: number;
  lng: number;
}


const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API as string;

export default function BusinessLocations({ address }: {address : string[]}) { 
  
  const position: Position = { lat: 53.54992, lng: 10.00678 };

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API}>
      <Map defaultCenter={position} defaultZoom={10}>
        <GeoMarker locs={address} /> 
      </Map>
    </APIProvider>
  );
}
