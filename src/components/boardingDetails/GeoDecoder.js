import React from 'react'

const GeoDecoder = () => {

  function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d * 1609.34; // convert distantce into meter
  }

  const mk1 = {
    lat: 9.678651473053813,
    lng: 80.0370418722865,
  }
  const mk2 = {
    lat: 9.680867614310692,
    lng: 80.03870879184262
  }
  console.log(haversine_distance(mk1, mk2));

  return (
    <div>GeoDecoder</div>
  )
}

export default GeoDecoder