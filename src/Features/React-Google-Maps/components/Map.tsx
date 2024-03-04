import { Circle, GoogleMap, InfoWindow, Marker, Polygon } from '@react-google-maps/api';
import React, { useState } from 'react'
import redMarker  from '../images/map-marker-icon_4x.png'
import goldMarker  from '../images/map-marker-icon-gold_4x.png'
import blueMarker  from '../images/map-marker-icon-blue_4x.png'
import greenMarker  from '../images/map-marker-icon-green-dot_1_3x.png'
import lightGreen from '../images/location-marker-icon-1735x2048-i3twt0x3XY.png'
import '../Map.css'
import { mapOptions } from './MapConfigiration';



const Map = ({

  isLoaded,
  shape,
  setCounterRadius,
  counterRadius,
  setIsCounterRadius,
  setCircleData,
  circleData,
  defaultCenter,
  polygonFalse

}:any) => {


  

  // const [selectedMark,setSelectedMark] =  useState<string | any>("");
  // State to store the marker position
  const [markerPosition, setMarkerPosition] = useState<any>(defaultCenter);
  const [coordArray,setCordArray] =   useState<any>([]);


  
  
  // React.useEffect(()=>(  console.log("ShapeS",shape) ),[shape]);

  // Function to handle map click event
  
  const handleMapClick = (event:any) => {
    const clickedPosition = {
      lat: event?.latLng?.lat(),
      lng: event?.latLng?.lng()
    };


    if(shape === 'Polygon'){
      
        // console.log("Shape under if :",shape);

        // setIsCounterRadius(false);

        // setCounterRadius(0);
        // setCircleData({
        //   position:defaultCenter,
        //   radius:0
        // });

      setCordArray([...coordArray,clickedPosition]);
      setCircleData({
        ...circleData,
        position:clickedPosition
      })
      
      
    }else if (shape === 'Circle'){

      setIsCounterRadius(true);
      setCordArray([]);
      
       
        setCounterRadius(counterRadius  === 0  ? 5000 :  counterRadius);
        
        setCircleData({
          position:clickedPosition,
          radius: counterRadius === 0  ? 5000 : counterRadius
        });  
        
      
    }else{
      setIsCounterRadius(false);
      setCircleData({
        position:clickedPosition,
        radius:0
      });
      
      setCordArray([]);

      setMarkerPosition(clickedPosition);

    }

  };


  const containerStyle = {
    width: '100%',
    height: '85vh'
  };
  
  // const center = {
  //   lat: 24.8607,
  //   lng: 67.0011
  // };


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

console.log('shape',shape)

  return isLoaded && (
    <GoogleMap
    
      mapContainerStyle={containerStyle}
      center={circleData.position}
      zoom={10}
      options={{
        mapTypeId:'terrain',
        zoomControl:false,
        gestureHandling: "cooperative",
        disableDefaultUI:true,
        fullscreenControl:false,
        // zoomControlOptions:null,
      keyboardShortcuts:false,
      styles:mapOptions.mapTheme,

    
    
      

      }}


onClick={handleMapClick}
   
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <>

     { shape == 'Polygon' ?  <Polygon
          paths={coordArray}
          options={{
            fillColor: '#FF0000',
            fillOpacity: 0.5,
            strokeColor: 'black',
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
        
       : shape == 'Circle' &&  (<Circle
       center={circleData.position}
       radius={circleData.radius}
       options={{
         fillColor: '#FF0000',
         fillOpacity: 0.5,
         strokeColor: 'white',
         strokeOpacity: 1,
         strokeWeight: 2,
       }}


     />)
      

    }


{


shape == 'Polygon' ? 

coordArray.length > 0 &&  coordArray.map((coordinates:any,idX:number)=>(

  <Marker position={coordinates} options={{icon:lightGreen,}} key={idX} animation={google.maps.Animation.DROP} />
  
  ))
  
  : shape == 'Circle' ?
  
  <Marker position={circleData.position} options={{icon:lightGreen,}} animation={google.maps.Animation.BOUNCE} />
  
  : shape == 'Normal' && 
  <Marker position={markerPosition} options={{icon:lightGreen,}} animation={google.maps.Animation.BOUNCE}   />

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

