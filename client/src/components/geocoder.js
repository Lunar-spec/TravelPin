import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import './geocoder.css'
const geocoder = () => {
    const ctrl = new MapBoxGeocoder({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
        mapboxgl: mapboxgl,
        marker:{
            color: "#FFC300",
          },
        collapsed:false,
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControl(() => ctrl)
  return (
    null
  )
}

export default geocoder