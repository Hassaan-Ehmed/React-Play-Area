import {
  Button,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import {
  useJsApiLoader
} from "@react-google-maps/api";
import React, { useState } from "react";
import Map from "./components/Map";
import { mapOptions } from "./components/MapConfigiration";

export default function ReactGoogleMapes() {
  const defaultCenter = {
    lat: 24.8607,
    lng: 67.0011,
  };

  const [shape, setShape] = React.useState("Normal");
  const [isCounterRadius, setIsCounterRadius] = React.useState(false);
  const [counterRadius, setCounterRadius] = useState<any>(0);
  const [circleRadius, setCircleRadius] = useState(0);
  const [center, setCenter] = useState(defaultCenter);
  
  

  const [coordArray, setCordArray] = useState<any>([]);
  const [markerPosition, setMarkerPosition] = useState<any>(defaultCenter);

  const polygonFalse = () => setIsCounterRadius(false);

  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    shape: string
  ) => {
    if (shape === "Polygon" || shape === "Normal" || shape === "Circle" ) {
      setCordArray([]);
      setIsCounterRadius(false);
      setMarkerPosition(defaultCenter)
      setCenter(defaultCenter);
      setCounterRadius(0);
      setCircleRadius(0);

    }

    setShape(shape);
  };

  function handleDecrementRadius() {
    if (circleRadius > 1000) {
      setCounterRadius(counterRadius - 1000 );
      setCircleRadius( counterRadius - 1000 );

    }
  }

  function handleIncrementRadius() {
    if (circleRadius < 18000) {
      setCounterRadius(counterRadius + 1000);
      setCircleRadius( counterRadius + 1000 );

    }
  }

  return (
    <>
      <center>
        <h1>
          React - Google - Map
          <ToggleButtonGroup
            sx={{ ml: 4 }}
            color="primary"
            value={shape}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Normal">Normal</ToggleButton>
            <ToggleButton value="Polygon">Polygon</ToggleButton>
            <ToggleButton value="Circle">Circle</ToggleButton>
          </ToggleButtonGroup>
          {isCounterRadius && shape === "Circle" && (
            <>
              <Button
                sx={{
                  ml: 4,
                  mr: 2,
                  bgcolor: "red",
                  ":hover ": { bgcolor: "darkred" },
                }}
                variant="contained"
                disabled={circleRadius === 1000 && true}
                onClick={handleDecrementRadius}
              >
                -
              </Button>

              <span style={{ fontSize: "15px" }}>
                Circle Radius {counterRadius ?? 1000}
              </span>

              <Button
                sx={{
                  ml: 2,
                  bgcolor: "green",
                  ":hover ": { bgcolor: "darkgreen" },
                }}
                variant="contained"
                disabled={circleRadius === 17000 && true}
                onClick={handleIncrementRadius}
              >
                +
              </Button>
            </>
          )}
        </h1>
      </center>
      <Map
        isLoaded={isLoaded}
        shape={shape}
        setCounterRadius={setCounterRadius}
        counterRadius={counterRadius}
        setIsCounterRadius={setIsCounterRadius}
        setCircleRadius={setCircleRadius}
        circleRadius={circleRadius}
        defaultCenter={defaultCenter}
        setCenter={setCenter}
        center={center}
        coordArray={coordArray}
        setCordArray={setCordArray}
        setMarkerPosition={setMarkerPosition}
        markerPosition={markerPosition}
      />
    </>
  );
}
