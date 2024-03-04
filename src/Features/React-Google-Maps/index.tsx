import React, { useReducer, useState } from 'react'
import Map from './components/Map'
import { GoogleMap, Polygon, useGoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { mapOptions } from './components/MapConfigiration'
import { Button, ButtonGroup, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function ReactGoogleMapes() {

  const defaultCenter = {
    lat: 24.8607,
    lng: 67.0011
  };
  const [shape,setShape] = React.useState('Normal');
  const [isCounterRadius,setIsCounterRadius] = React.useState(false);
  const [counterRadius,setCounterRadius] = useState<any>(0);
  const [circleData, setCircleData] = useState({position : defaultCenter, radius:0 });

  const polygonFalse = () => setIsCounterRadius(false);

  // const [isCounterButtonDisabled,setIsCounterButtonDisabled] = useReducer((prevState:any,newState:any)=>{

  //   return {...prevState,newState}

  // },{inc:false,dec:false})


    const { isLoaded } = useJsApiLoader({
        id: mapOptions.googleMapApiKey,
        googleMapsApiKey: mapOptions.googleMapApiKey
      });

      const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        shape: string,
      ) => {


         if(shape === 'Polygon' || shape === 'Normal' ){

          
          setIsCounterRadius(false);
    
          setCounterRadius(0);
          setCircleData({
            position:defaultCenter,
            radius:0
          });
          } 


        setShape(shape);
      };

  function handleDecrementRadius() {


    if(circleData.radius  >  1000){
  
    setCounterRadius( counterRadius - 1000);
    setCircleData({
      ...circleData,
      radius:counterRadius-1000
    });

  }
  

  }

  
  function handleIncrementRadius() {

if(circleData.radius < 18000){

  
  setCounterRadius( counterRadius + 1000);
  setCircleData({
    ...circleData,
    radius:counterRadius+1000
  })
  
}


  }


  console.log("is Counter Exisit ?",isCounterRadius);


  return (
    <>
    <center><h1>
      React -  Google -  Map



<ToggleButtonGroup sx={{ml:4}}  

color="primary"
value={shape}
exclusive
onChange={handleChange}
aria-label="Platform"


>
  <ToggleButton  value='Normal'>Normal</ToggleButton>
  <ToggleButton value='Polygon' >Polygon</ToggleButton>
  <ToggleButton value='Circle' >Circle</ToggleButton>
  
</ToggleButtonGroup>
{(isCounterRadius &&  shape === 'Circle') && 
  <>
  
<Button 
  sx={{ml:4,mr:2,bgcolor:"red", ":hover ":{bgcolor:"darkred"} }}  
  variant='contained' 
  disabled={circleData.radius === 1000 && true}
  onClick={handleDecrementRadius}
  
  >
    -
</Button>

  <span style={{fontSize:'15px'}}>Circle Radius {counterRadius  ??  1000  }</span>

<Button  

sx={{ml:2,bgcolor:"green",":hover ":{bgcolor:"darkgreen"}}}
variant='contained'

disabled={circleData.radius === 17000 && true}

onClick={handleIncrementRadius}
>
+
</Button>

  </>
  
  }

    </h1>
    </center>
      <Map 
      isLoaded={isLoaded}
       shape={shape}
       setCounterRadius={setCounterRadius}
       counterRadius={counterRadius}
           setIsCounterRadius={setIsCounterRadius}
           polygonFalse={polygonFalse}
           setCircleData={setCircleData}
           circleData={circleData}
           defaultCenter={defaultCenter}

           
           
           />
    </>
  )
}
