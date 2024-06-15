import { useEffect, useState } from "react";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function useGoogleMaps() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const existingScript = document.getElementById("googleMapsScript");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "googleMapsScript";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setMapLoaded(true);
        document.head.appendChild(script);
      } else {
        setMapLoaded(true);
      }
    } else {
      setMapLoaded(true);
    }
  }, []);

  return mapLoaded;
}
