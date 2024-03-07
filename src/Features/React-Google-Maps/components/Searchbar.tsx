import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const Searchbar = ({
  handlePlaceChanged,
  inputRef,
  handleCurrentLocation,
  setInput
}: any) => {
  return (
    <div style={{ position: "absolute", zIndex: 3, top: 100, left: 30 }}>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <div style={{ position: "relative" }}>
          <TextField
            hiddenLabel
            id="pac-input"
            className="form-control"
            // label="Enter a location"
            type="text"
            color="primary"
            sx={{ bgcolor: "white" }}
            size="medium"
        defaultValue="Search Location"
        variant="filled"

        onChange={(e) => setInput(e.target.value)}

          />
{/* 

<TextField
      
        id="filled-hidden-label-normal"
      /> */}

          <MyLocationIcon
            sx={{
              position: "absolute",
              left: 180,
              top: 15,
              cursor: "pointer",
              bgcolor: "#F0F0F0",
            }}
            onClick={handleCurrentLocation}
          />
        </div>
      </StandaloneSearchBox>

      {/* <input
        id="pac-input"
        className='form-control'
        type="text"
        placeholder="Enter a location"
      /> */}
    </div>
  );
};

export default Searchbar;
