import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import redMarker from "../images/map-marker-icon_4x.png";
import goldMarker from "../images/map-marker-icon-gold_4x.png";
import blueMarker from "../images/map-marker-icon-blue_4x.png";
import greenMarker from "../images/map-marker-icon-green-dot_1_3x.png";
import lightGreen from "../images/location-marker-icon-1735x2048-i3twt0x3XY.png";
import "../Map.css";
import { mapOptions } from "./MapConfigiration";

const Map = ({
  isLoaded,
  shape,
  setCounterRadius,
  counterRadius,
  setIsCounterRadius,
  setCircleRadius,
  circleRadius,
  setCenter,
  center,
  defaultCenter,
  setCordArray,
  coordArray,
  setMarkerPosition,
  markerPosition,
}: any) => {
  const [map, setMap] = React.useState<any>(null);
  const mapRef = useRef<any>();

  // React.useCallback(function callback

  // const settingBounds = (map: any) => {
  //   console.log("map------------------", map);

  //   if (map && typeof map.fitBounds === "function") {
  //     const bounds = new window.google.maps.LatLngBounds(defaultCenter);

  //     console.log("bounds------------------", bounds);

  //     map.fitBounds(bounds);

  //     setMap(map);
  //   } else {
  //     console.error(
  //       "Map object is not valid or does not support fitBounds method"
  //     );
  //   }
  // };
  // }, [map])

  // const onUnmount = React.useCallback(function callback(map:any) {
  //   setMap(null)
  // }, [])

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);
    setMap(map);

    console.log(map.getZoom());
    
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  // Function to handle map click event

  const handleMapClick = (event: any) => {
    // settingBounds(event);

    const clickedPosition = {
      lat: event?.latLng?.lat(),
      lng: event?.latLng?.lng(),
    };

    if (shape === "Polygon") {

    setMarkerPosition(clickedPosition);
      setCordArray([...coordArray, clickedPosition]);


 if (!map) { return; }
 const googleMap = map;
 const bounds = new window.google.maps.LatLngBounds(clickedPosition);
 googleMap.fitBounds(bounds);


    } else if (shape === "Circle") {


      setIsCounterRadius(true);
      setMarkerPosition(clickedPosition);
      setCordArray([]);

      setCounterRadius(counterRadius === 0 ? 50 : counterRadius);


    setCircleRadius(counterRadius === 0 ? 50 : counterRadius);


      // setCircleData({
      //   // position: clickedPosition,
      //   ...circleData,
      //   radius: counterRadius === 0 ? 50 : counterRadius,
      // });

      if (!map) { return; }
      const googleMap = map;
      const bounds = new window.google.maps.LatLngBounds(clickedPosition);

      let zoom = googleMap.getZoom();
      googleMap.setZoom(zoom > 6 ? 6 : zoom);
      googleMap.fitBounds(bounds);


    } else {
      setIsCounterRadius(false);
      setMarkerPosition(clickedPosition);
      setCordArray([]);

      if (!map) { return; }

      // const googleMap = map;
      // const panTo = new window.google.maps.LatLng(
      //   clickedPosition.lat,
      //   clickedPosition.lng
      // );
      // googleMap.panTo(panTo);
      // if (!map) {
      //   return;
      // }

      const googleMap = map;
      const bounds = new window.google.maps.LatLngBounds(clickedPosition);
      googleMap.fitBounds(bounds);
    }
  };

  const containerStyle = {
    width: "100%",
    height: "85vh",
  };

  // const center = {
  //   lat: 24.8607,
  //   lng: 67.0011
  // };

  const anotherMarker = {
    lat: 24.8684,
    lng: 66.9183,
  };

  const markers = [
    {
      name: "Karachi",
      status: "active",
      location: {
        lat: 24.8607,
        lng: 67.0011,
      },
    },

    {
      name: "Mauripor",
      status: "pospond",
      location: {
        lat: 24.8684,
        lng: 66.9183,
      },
    },

    {
      name: "Gharo",
      status: "comming-soon",
      location: {
        lat: 24.7438,
        lng: 67.5798,
      },
    },

    {
      name: "gadap Town",
      status: "pending",
      location: {
        lat: 25.2493,
        lng: 67.2848,
      },
    },
  ];

  const waterStyle = [
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#FD0000",
        },
      ],
    },
  ];

  const generateMarker = (status: string) => {
    switch (status) {
      case "active":
        return redMarker;
        break;

      case "pospond":
        return blueMarker;
        break;

      case "comming-soon":
        return greenMarker;
        break;

      case "pending":
        return goldMarker;
    }
  };

  return (
    isLoaded && (
      <GoogleMap
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{
          mapTypeId: "terrain",
          zoomControl: false,
          gestureHandling: "cooperative",
          disableDefaultUI: true,
          fullscreenControl: false,
          // zoomControlOptions:null,
          keyboardShortcuts: false,
          styles: mapOptions.mapTheme,
        }}
        onClick={handleMapClick}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {shape == "Polygon" ? (
            <Polygon
              paths={coordArray}
              options={{
                fillColor: "#FF0000",
                fillOpacity: 0.5,
                strokeColor: "black",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          ) : (
            shape == "Circle" && (
              <Circle
                center={markerPosition}
                radius={circleRadius}
                options={{
                  fillColor: "#FF0000",
                  fillOpacity: 0.5,
                  strokeColor: "white",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            )
          )}

          {shape == "Polygon" ? (
            coordArray.length > 0 &&
            coordArray.map((coordinates: any, idX: number) => (
              <Marker
                position={coordinates}
                options={{ icon: lightGreen }}
                key={idX}
                animation={google.maps.Animation.DROP}
              />
            ))
          ) : shape == "Circle" ? (
            <Marker

              position={markerPosition}
              options={{ icon: lightGreen }}
              animation={google.maps.Animation.BOUNCE}
            />
          ) : (
            shape == "Normal" && (
              <Marker
                position={markerPosition}
                options={{ icon: lightGreen }}
                animation={google.maps.Animation.BOUNCE}
              />
            )
          )}

          {/* {
    selectedMark && 
    (

<InfoWindow position={selectedMark.location} 

options={{
  pixelOffset: new window.google.maps.Size(0,-30)
  }}>

  <>
  <h1>Location - {selectedMark.name}</h1>
  <p> Status - {selectedMark.status}</p>
      <button onClick={()=>{setSelectedMark("")}}>close</button>
  </>

</InfoWindow>
    )
  } */}
        </>
      </GoogleMap>
    )
  );
};

export default Map;
