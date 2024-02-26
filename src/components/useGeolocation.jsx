import { useState } from "react";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }
  return { loading, error, position, getPosition };
}
