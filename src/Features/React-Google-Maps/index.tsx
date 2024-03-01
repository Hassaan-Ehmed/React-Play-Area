import React from 'react'
import Map from './components/Map'
import { useJsApiLoader } from '@react-google-maps/api'
import { mapOptions } from './components/MapConfigiration'

export default function ReactGoogleMapes() {

    const { isLoaded } = useJsApiLoader({
        id: mapOptions.googleMapApiKey,
        googleMapsApiKey: mapOptions.googleMapApiKey
      })
  return (
    <>
    <center><h1>
      React -  Google -  Map
    </h1></center>
      <Map isLoaded={isLoaded}/>
    </>
  )
}
