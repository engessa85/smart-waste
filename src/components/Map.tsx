

import { useState } from "react";
import { APIProvider, Map as GoogleMap, Marker, InfoWindow } from "@vis.gl/react-google-maps";

const API_KEY = "AIzaSyBoryl8NBe9Sr3OQVfeiyclmT4LNDiUzWU";

type Location = {
  id: number;
  name: string;
  description: string;
  position: { lat: number; lng: number };
};

function Map(props:Location) {
  
  const location: Location = {
    id: props.id,
    name: props.name,
    description: props.description,
    position: { lat: props.position.lat, lng: props.position.lng },
  };

  const [selected, setSelected] = useState<Location | null>(null);

  return (
    <div className="bg-slate-50 p-4">
      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          style={{ width: "100%", height: "70vh", borderRadius: "12px" }}
          defaultCenter={location.position}
          defaultZoom={14}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          <Marker
            position={location.position}
            icon={{
              url: "/logo.png",
              scaledSize: { width: 40, height: 40 },
              anchor: { x: 20, y: 20 },
            }}
            onClick={() => setSelected(location)}
          />

          {selected && (
            <InfoWindow
              position={selected.position}
              onCloseClick={() => setSelected(null)}
            >
              <div className="p-4 bg-white rounded-lg shadow-md max-w-xs">
                <h3 className="text-lg font-semibold mb-1">{selected.name}</h3>
                <p className="text-sm text-gray-600">{selected.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

export default Map;
