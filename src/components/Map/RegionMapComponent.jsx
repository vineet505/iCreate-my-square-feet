import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_API_KEY } from "@/static/Static";
import PlaceIcon from "@mui/icons-material/Place";
import { fromLatLng, setKey } from "react-geocode";
import { darkModeStyles } from "./dark_mode_styles";
import { useTheme } from "next-themes";

const Marker = () => (
  <div className="text-red-500 text-2xl">
    <PlaceIcon />
  </div>
);

const RegionMapComponent = ({
  locationHandler,
  fetchedLocation = { lat: 22, lng: 77 },
  isNew = true,
}) => {
  const [location, setLocation] = useState({
    lat: 22,
    lng: 77,
  });
  const [selectedLocation, setSelectedLocation] = useState({});
  const { theme } = useTheme();
  const [stylesforMap, setStylesforMap] = useState({
    fullscreenControl: false,
    styles: theme === "dark" ? darkModeStyles : [],
  });

  const fetchData = async (lat, lng) => {
    setKey(GOOGLE_MAP_API_KEY);
    const res = await fromLatLng(lat, lng);
    const address = res.results[0].formatted_address;
    const place = {
      lat: lat,
      lng: lng,
      address: address,
    };
    setSelectedLocation(place);
  };

  useEffect(() => {
    if (isNew) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchData(position.coords.latitude, position.coords.longitude);
        });
      }
    }else{
      setLocation(fetchedLocation);
      fetchData(fetchedLocation.lat, fetchedLocation.lng);
    }
  }, [isNew, fetchedLocation.lat, fetchedLocation.lng]);

  function _onClick(obj) {
    locationHandler(obj.lat, obj.lng);
    setLocation({ lat: obj.lat, lng: obj.lng });
    fetchData(obj.lat, obj.lng);
  }

  useEffect(() => {
    setStylesforMap({
      fullscreenControl: false,
      styles: theme === "dark" ? darkModeStyles.styles : [],
    });
  }, [theme]);

  return (
    <>
      <div className="h-[50vh] w-full px-2">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
          center={location}
          zoom={11}
          onClick={_onClick}
          options={stylesforMap}          
        >
          <Marker lat={location.lat} lng={location.lng} />
        </GoogleMapReact>
      </div>
      <div className="text-black dark:text-white px-2 mt-4">
        <span>Selected Address: {selectedLocation.address}</span>
      </div>
    </>
  );
};

export default RegionMapComponent;
