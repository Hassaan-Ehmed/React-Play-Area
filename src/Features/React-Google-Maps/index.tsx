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
import RouteIcon from '@mui/icons-material/Route';

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


  React.useEffect(()=>{

try{

  setCordArray([]);
  setIsCounterRadius(false);
  setMarkerPosition(defaultCenter)
  setCenter(defaultCenter);
  setCounterRadius(0);
  setCircleRadius(0);

setShape(shape);

} catch(error){
      console.log("Error Occured: ",error);
}

  },[])




  const { isLoaded } = useJsApiLoader({
  
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,

  });


  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    shape: string
  ) => {

    try{


      setCordArray([]);
      setIsCounterRadius(false);
      setMarkerPosition(defaultCenter)
      setCenter(defaultCenter);
      setCounterRadius(0);
      setCircleRadius(0);

    setShape(shape);
 
  }catch(error){
    console.log("Error Occured: ",error);

  }

  };



  const handleRadiusCounter = (action:string,limit:number)=> {

try{


  if(action === 'Decrement'){

    if (circleRadius > limit) {
      
      setCounterRadius(counterRadius - 1000 );
      setCircleRadius( counterRadius - 1000 );

    }
  
  }else if(action === 'Increment') {
    
      setCounterRadius(counterRadius + 1000);
      setCircleRadius( counterRadius + 1000 );

  }

  }catch(error){
  
    console.log("Error Occured: ",error);
  
  }

}

  return (
    <>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

        <h1>React - Google - Map </h1>
          
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
            <ToggleButton value="Route">Route<RouteIcon/></ToggleButton>
          </ToggleButtonGroup>
            <div  style={{width:"20%",margin:"0 10px",display:"flex",justifyContent:"center",alignItems:"center"}}>
          {isCounterRadius && shape === "Circle" ? (
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
                onClick={()=>handleRadiusCounter("Decrement",1000)}
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
                onClick={()=>handleRadiusCounter("Increment",18000)}
              >
                +
              </Button>
              </>
              ) : shape === "Route"}
            </div>
         
        
      </div>
      <Map
        isLoaded={isLoaded}
        shape={shape}
        setShape={setShape}
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
