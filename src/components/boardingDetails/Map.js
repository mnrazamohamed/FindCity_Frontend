import React, { useMemo, useState } from 'react'
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api'
import { useDispatch } from 'react-redux'
import { mapActions } from '../../store/mapSlice'
import { Box, Typography } from '@mui/material'

const Map = ({ drag = false, mt = 3, lat, lng, circle = false }) => {
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: "AIzaSyCbmSTEGlD-KFPipBrAys-xEmGRsmHvlZ8" })
  const dispatch = useDispatch()

  const MarkerPosition = useMemo(() => ({ lat: lat ?? 9.661508120592226, lng: lng ?? 80.02554547964867 }), [])

  const handleMarkerDragEnd = e => {
    dispatch(mapActions.set({ lat: e.latLng.lat(), lng: e.latLng.lng() }))
  }

  if (!isLoaded)
    return (
      <Box width={400} height={300} display="flex" justifyContent="center" alignItems="center">
        <Typography fontSize={24} fontWeight={900}>Loading...</Typography>
      </Box>
    )

  if (loadError)
    return (
      <Box width={400} height={300} display="flex" justifyContent="center" alignItems="center">
        <Typography fontSize={24} fontWeight={900}>Something went wrong try again</Typography>
      </Box>
    )

  return (
    <Box
      marginTop={mt}
      width={400}
      height={300}
      borderRadius={3.5}
      sx={{ borderColor: "#B4B4B4", borderStyle: "solid", borderWidth: 0.5 }}
      boxShadow={10}>
      <GoogleMap
        zoom={15}
        center={MarkerPosition}
        mapContainerStyle={{
          width: 400,
          height: 300,
          borderRadius: 16,
        }}>
        <Marker
          position={MarkerPosition}
          draggable={drag}
          onDragEnd={handleMarkerDragEnd}
          onDblClick={e => window.open(`https://www.google.com/maps/search/?api=1&query=${e.latLng.lat()},${e.latLng.lng()}`, '_blank', 'location=yes,height=900,width=1600,scrollbars=yes,status=yes')}
        />
        {circle && (
          <Circle
            center={MarkerPosition}
            radius={300}
            options={
              { "strokeColor": "#ff0000" }
            }
          />
        )}
      </GoogleMap>
    </Box>
  )
}

export default Map