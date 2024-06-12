import { Marker, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type Position = {
    lat: number;
    lng: number;
};

interface Props {
    locs: string[]; 
}

const GeoMarker: React.FC<Props> = ({ locs }) => { 
    const [geocodedPositions, setGeocodedPositions] = useState<Position[]>([]);
    
    const geocodingAPILoaded = useMapsLibrary('geocoding');

    const [ geocodingservice, setGeocodingService ] = useState<google.maps.Geocoder>();

    useEffect(() => {
        if (geocodingAPILoaded) {
            setGeocodingService(new window.google.maps.Geocoder());
        }

        if (!geocodingservice || !locs) {
            return;
        }

        locs.forEach((loc) => {
            geocodingservice.geocode({ address: loc }, (results, status) => {
                if (status === "OK") {
                    const { lat, lng } = results[0].geometry.location;
                    setGeocodedPositions((prev) => [...prev, { lat: lat(), lng: lng() }]);
                }
            });
        });

    }, [geocodingAPILoaded]);
    
    if(!geocodingservice) {
        return null;
    }

    
    return (
        <>
            {geocodedPositions.map((position, index) => (
                <Marker key={index} position={position} />
            ))}
        </>
    );
};

export default GeoMarker;
