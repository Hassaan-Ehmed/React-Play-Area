import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import React, { useState } from 'react'
import redMarker  from '../images/map-marker-icon_4x.png'
import goldMarker  from '../images/map-marker-icon-gold_4x.png'
import blueMarker  from '../images/map-marker-icon-blue_4x.png'
import greenMarker  from '../images/map-marker-icon-green-dot_1_3x.png'
import '../Map.css'
import { mapOptions } from './MapConfigiration';

const Map = ({isLoaded}:any) => {
  const defaultCenter = {
    lat: 24.8607,
    lng: 67.0011
  };

  // const [selectedMark,setSelectedMark] =  useState<string | any>("");
  // State to store the marker position
  const [markerPosition, setMarkerPosition] = useState<any>(defaultCenter);

  // Function to handle map click event
  const handleMapClick = (event:any) => {
    const clickedPosition = {
      lat: event?.latLng?.lat(),
      lng: event?.latLng?.lng()
    };

     console.log("after setting new position...",clickedPosition)
    setMarkerPosition(clickedPosition);
    
  };


  const containerStyle = {
    width: '100%',
    height: '90vh'
  };
  
  const center = {
    lat: 24.8607,
    lng: 67.0011
  };


  const anotherMarker={
    lat:24.8684,
    lng:66.9183

  }

 const markers = [
    {
      name:"Karachi",
      status:"active",
      location:{
        lat: 24.8607,
        lng: 67.0011
      }
    },
    
    {
      name:"Mauripor",
      status:"pospond",
      location:{
        lat:24.8684,
        lng:66.9183
      }
    },
    
    {
      name:"Gharo",
      status:"comming-soon",
      location:{
        lat:24.7438,
        lng:67.5798
      }
    },

    {
      name:"gadap Town",
      status:"pending",
      location:{
        lat:25.2493,
        lng:67.2848
      }
    },


  
  ]
  
  const waterStyle=[
    {
      featureType:"water",
      elementType:'geometry.fill',
      stylers:[
        {
          color:"#FD0000"
        }
      ]
    }
  ]


  const generateMarker = (status:string) => {

    
    switch(status){

      case  "active" :
        return redMarker;
        break;

        case "pospond" : 
        return blueMarker;
         break;

         case "comming-soon":
          return greenMarker;
          break;

          case "pending" : 
          return goldMarker ;
    
    }

  }

  console.log('markerPosition',markerPosition);

  return isLoaded && (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      options={{
        
        mapTypeId:'hybrid',
        zoomControl:true,
        gestureHandling: "cooperative",
        // disableDefaultUI:true
        fullscreenControl:false,
      keyboardShortcuts:false,
      styles:mapOptions.mapTheme

      }}

onClick={handleMapClick}
   
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <>


 
 { markerPosition  && <Marker position={markerPosition} 
 

 options={{
  icon:goldMarker
 }}

 />
}
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
}

export default Map

