import React, { useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, DrawingManager } from '@react-google-maps/api';
import { Box, Button, Typography } from '@mui/material';

const libraries = ['drawing'];

const mapContainerStyle = {
  width: '85%',
  height: '70%',
};

const center = {
  lat: 33.4984,
  lng: 36.3057,
};

const ZoneMap = ({ onPolygonComplete ,setClearPolygonFn}) => {
  const polygonRef = useRef(null); 

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD9zQQNoowad3i_Fycd6YrfbR2mfysHtnQ',
    libraries,
  });

  const handlePolygonComplete = useCallback((polygon) => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }

    polygonRef.current = polygon; 

    const path = polygon.getPath();
    const coords = [];

    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coords.push({ lat: point.lat(), lng: point.lng() });
    }

    onPolygonComplete(coords);
  }, [onPolygonComplete]);

  const clearPolygon = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
  };
   useEffect(() => {
    if (setClearPolygonFn) {
      setClearPolygonFn(() => clearPolygon);
    }
  }, [setClearPolygonFn]);

  if (!isLoaded) return <Box justifyContent={'center'} textAlign={'center'}>
     <Typography>
      Loading map...
     </Typography>
  </Box>

  return (
    <>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
        <DrawingManager
          onPolygonComplete={handlePolygonComplete}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              drawingModes: ['polygon'],
              position: window.google.maps.ControlPosition.TOP_CENTER,
            },
            polygonOptions: {
              fillColor: '#2196f3',
              strokeColor: '#1e88e5',
              strokeWeight: 2,
              editable: true,
              draggable: false,
            },
          }}
        />
      </GoogleMap>
      
    </>
  );
};

export default ZoneMap;
