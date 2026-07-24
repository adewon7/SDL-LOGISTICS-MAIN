import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;
mapboxgl.accessToken = TOKEN;

export interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  pickup?: LatLng | null;
  destination?: LatLng | null;
  height?: number;
  onDistanceChange?: (km: number) => void;
  onLocationDetected?: (location: LatLng, address: string) => void;
}

// Abuja center as fallback [lng, lat]
const ABUJA: [number, number] = [7.4951, 9.0579];

export function RideMap({
  pickup,
  destination,
  height = 220,
  onDistanceChange,
  onLocationDetected,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const pickupMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const destMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  // Create a pulsing blue dot for user location
  const createUserDot = () => {
    const el = document.createElement("div");
    el.style.cssText = `
      width: 20px; height: 20px; border-radius: 50%;
      background: #4A90E2; border: 3px solid #fff;
      box-shadow: 0 0 0 4px rgba(74,144,226,0.3);
      animation: pulse 2s infinite;
    `;
    return el;
  };

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: ABUJA,
      zoom: 12,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Try to get user's real location
    if (navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          setLocating(false);

          // Show user location dot on map
          if (mapRef.current) {
            userMarkerRef.current = new mapboxgl.Marker({ element: createUserDot() })
              .setLngLat([lng, lat])
              .addTo(mapRef.current);
            mapRef.current.flyTo({ center: [lng, lat], zoom: 14, speed: 1.5 });
          }

          // Reverse geocode to get address
          try {
            const res = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address,poi,neighborhood&language=en&access_token=${TOKEN}`
            );
            const data = await res.json();
            const address = data.features?.[0]?.place_name ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            onLocationDetected?.({ lat, lng }, address);
          } catch {
            onLocationDetected?.({ lat, lng }, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          }
        },
        () => {
          setLocating(false);
          // Permission denied or unavailable — stay on Abuja center
        },
        { timeout: 8000, maximumAge: 60000 }
      );
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers and route when pickup/destination change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    pickupMarkerRef.current?.remove();
    destMarkerRef.current?.remove();
    setDistance(null);

    if (map.getLayer("route")) map.removeLayer("route");
    if (map.getSource("route")) map.removeSource("route");

    const bounds = new mapboxgl.LngLatBounds();

    if (pickup) {
      pickupMarkerRef.current = new mapboxgl.Marker({ color: "#0E9F8A" })
        .setLngLat([pickup.lng, pickup.lat])
        .setPopup(new mapboxgl.Popup().setText("Pickup"))
        .addTo(map);
      bounds.extend([pickup.lng, pickup.lat]);
    }

    if (destination) {
      destMarkerRef.current = new mapboxgl.Marker({ color: "#0B2545" })
        .setLngLat([destination.lng, destination.lat])
        .setPopup(new mapboxgl.Popup().setText("Destination"))
        .addTo(map);
      bounds.extend([destination.lng, destination.lat]);
    }

    if (pickup && destination) {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}?geometries=geojson&access_token=${TOKEN}`
      )
        .then((r) => r.json())
        .then((data) => {
          if (!data.routes?.[0]) return;
          const route = data.routes[0];
          const km = (route.distance / 1000).toFixed(1);
          setDistance(km);
          onDistanceChange?.(parseFloat(km));

          const drawRoute = () => {
            if (!mapRef.current) return;
            if (mapRef.current.getLayer("route")) mapRef.current.removeLayer("route");
            if (mapRef.current.getSource("route")) mapRef.current.removeSource("route");

            mapRef.current.addSource("route", {
              type: "geojson",
              data: { type: "Feature", properties: {}, geometry: route.geometry },
            });
            mapRef.current.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: { "line-join": "round", "line-cap": "round" },
              paint: { "line-color": "#14509E", "line-width": 5, "line-opacity": 0.85 },
            });

            const coords = route.geometry.coordinates as [number, number][];
            const routeBounds = coords.reduce(
              (b, c) => b.extend(c as mapboxgl.LngLatLike),
              new mapboxgl.LngLatBounds(coords[0], coords[0])
            );
            mapRef.current.fitBounds(routeBounds, { padding: 60 });
          };

          if (mapRef.current?.isStyleLoaded()) drawRoute();
          else mapRef.current?.once("load", drawRoute);
        })
        .catch(() => {
          if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 60 });
        });
    } else if (pickup || destination) {
      if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 80, maxZoom: 14 });
    }
  }, [pickup, destination, onDistanceChange]);

  return (
    <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)" }}>
      <div ref={containerRef} style={{ height, width: "100%" }} />

      {/* Locating indicator */}
      {locating && (
        <div style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.95)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: "5px 14px",
          fontSize: 12,
          fontWeight: 700,
          color: "var(--slate)",
          zIndex: 1,
          whiteSpace: "nowrap",
        }}>
          📍 Detecting your location…
        </div>
      )}

      {/* Distance badge */}
      {distance && (
        <div style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.95)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: "5px 14px",
          fontSize: 12.5,
          fontWeight: 800,
          color: "var(--navy)",
          zIndex: 1,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>
          {distance} km by road
        </div>
      )}

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(74,144,226,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(74,144,226,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,144,226,0); }
        }
      `}</style>
    </div>
  );
}