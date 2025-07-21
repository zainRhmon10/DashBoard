import { Box, Typography } from "@mui/material";
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const mapContainerStyle = {
  width: "85%",
  height: "70%",
};
const libraries = ["drawing"];

const ZoneMapDetails = ({ coordinates, onPolygonChange }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD9zQQNoowad3i_Fycd6YrfbR2mfysHtnQ',
    libraries,
  });

  const [paths, setPaths] = useState(coordinates);
  const polygonRef = useRef(null);

  const handleEdit = () => {
    const nextPath = polygonRef.current
      .getPath()
      .getArray()
      .map(latlng => ({
        lat: latlng.lat(),
        lng: latlng.lng(),
      }));

      console.log("Polygon edited:", nextPath);
    setPaths(nextPath);
    onPolygonChange(nextPath);
  };

 useEffect(() => {
  const areEqual =
    coordinates?.length === paths?.length &&
    coordinates?.every((coord, idx) =>
      coord.lat === paths[idx]?.lat && coord.lng === paths[idx]?.lng
    );

  if (!areEqual) {
    setPaths(coordinates);
  }
}, [coordinates]);


 const onLoad = (polygon) => {
  polygonRef.current = polygon;

  polygon.setEditable(true); 

  const path = polygon.getPath();

  path.addListener("set_at", () => {
    console.log("🔁 set_at triggered");
    handleEdit();
  });
  path.addListener("insert_at", () => {
    console.log("➕ insert_at triggered");
    handleEdit();
  });
  path.addListener("remove_at", () => {
    console.log("❌ remove_at triggered");
    handleEdit();
  });
};

  const center = paths?.[0] || { lat: 33.4984, lng: 36.3057 };

  if (!isLoaded)
    return (
      <Box justifyContent={"center"} textAlign={"center"}>
        <Typography>Loading map...</Typography>
      </Box>
    );

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
      <Polygon
      key={JSON.stringify(paths)}
        path={paths}
        options={{
          fillColor: "#2196f3",
          strokeColor: "#1e88e5",
          strokeWeight: 2,
          editable: true,
          draggable: false,
        }}
        onLoad={onLoad}
      />
    </GoogleMap>
  );
};

export default ZoneMapDetails;
