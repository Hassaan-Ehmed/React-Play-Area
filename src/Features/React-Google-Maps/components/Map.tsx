import {
  Circle,
  GoogleMap,
  InfoWindow,
  LoadScript,
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
import Searchbar from "./Searchbar";

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
  setShape,
}: any) => {
  console.log("in MAP INI", shape);
  console.log("in MAP INI MARKER>>", markerPosition);

  const [map, setMap] = React.useState<any>(null);
  const mapRef = useRef<any>();
  const inputRef = useRef<any>();

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
    // const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    // map.fitBounds(bounds);
    // setMap(map);

    // console.log(map.getZoom());

    const googleMap = map;

    const panTo = new window.google.maps.LatLng(defaultCenter);
    googleMap.panTo(panTo);

    setMap(googleMap);
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

      if (!map) {
        return;
      }

      const googleMap = map;
      const panTo = new window.google.maps.LatLng(
        clickedPosition.lat,
        clickedPosition.lng
      );
      googleMap.panTo(panTo);
    } else if (shape === "Circle") {
      setIsCounterRadius(true);
      setMarkerPosition(clickedPosition);
      setCordArray([]);

      setCounterRadius(counterRadius === 0 ? 5000 : counterRadius);

      setCircleRadius(counterRadius === 0 ? 5000 : counterRadius);

      if (!map) {
        return;
      }

      const googleMap = map;
      const panTo = new window.google.maps.LatLng(
        clickedPosition.lat,
        clickedPosition.lng
      );
      googleMap.panTo(panTo);
    } else {
      setIsCounterRadius(false);
      setMarkerPosition(clickedPosition);
      setCordArray([]);

      // if (!map) { return; }

      if (!map) {
        return;
      }

      const googleMap = map;
      const panTo = new window.google.maps.LatLng(
        clickedPosition.lat,
        clickedPosition.lng
      );
      googleMap.panTo(panTo);

      // const googleMap = map;
      // const bounds = new window.google.maps.LatLngBounds(clickedPosition);
      // googleMap.fitBounds(bounds);
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

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();

    if (place) {
      // console.log("Place Name",place.name);

      const selectedPoint = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setMarkerPosition(selectedPoint);
      setIsCounterRadius(false);
      setCordArray([]);

      // if (!map) { return; }

      if (!map) {
        return;
      }

      const googleMap = map;
      const panTo = new window.google.maps.LatLng(
        selectedPoint.lat,
        selectedPoint.lng
      );
      googleMap.panTo(panTo);
    }
  };

  // const handlePlaceChanged = () => {
  //   const input = inputRef.current.value;
  //   const placesService = new window.google.maps.places.PlacesService(mapRef.current);
  //   placesService.textSearch({ query: input }, (results, status) => {
  //     if (status === window.google.maps.places.PlacesServiceStatus.OK && results?.length) {
  //       const place:any = results[0];
  //       const selectedPoint = {
  //         lat: place.geometry.location.lat(),
  //         lng: place.geometry.location.lng()
  //       }
  //       setMarkerPosition(selectedPoint);
  //     }
  //   });
  // }

  const handleCurrentLocation = () => {

   
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // setShape('Normal')
        setIsCounterRadius(false);
        setMarkerPosition(currentLocation);
        setCordArray([]);

        // if (!map) { return; }

        if (!map) {
          return;
        }

        const googleMap = map;
        const panTo = new window.google.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        );
        googleMap.panTo(panTo);
      });
    } else {
      console.log("📍Geolocation is not supported by this browser");
    }
  };

  return (
    // isLoaded && (

    <>
      <LoadScript
        googleMapsApiKey={mapOptions.googleMapApiKey}
        libraries={["places"]}
      >
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
            <Searchbar
              handleCurrentLocation={handleCurrentLocation}
              handlePlaceChanged={handlePlaceChanged}
              inputRef={inputRef}
            />

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
                  // animation={google.maps.Animation.BOUNCE}
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
      </LoadScript>
    </>
  );
};

export default Map;
