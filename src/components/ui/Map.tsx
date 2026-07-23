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
}

const ABUJA: [number, number] = [7.4951, 9.0579]; // Mapbox uses [lng, lat]

export function RideMap({ pickup, destination, height = 220, onDistanceChange }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const pickupMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const destMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

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

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers and route
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    pickupMarkerRef.current?.remove();
    destMarkerRef.current?.remove();
    setDistance(null);

    // Remove existing route layer
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
      // Fetch route from Mapbox Directions API
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
            if (map.getLayer("route")) map.removeLayer("route");
            if (map.getSource("route")) map.removeSource("route");

            map.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: route.geometry,
              },
            });

            map.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: { "line-join": "round", "line-cap": "round" },
              paint: { "line-color": "#14509E", "line-width": 5, "line-opacity": 0.85 },
            });

            // Fit map to route
            const coords = route.geometry.coordinates as [number, number][];
            const routeBounds = coords.reduce(
              (b, coord) => b.extend(coord as mapboxgl.LngLatLike),
              new mapboxgl.LngLatBounds(coords[0], coords[0])
            );
            map.fitBounds(routeBounds, { padding: 60 });
          };

          if (map.isStyleLoaded()) {
            drawRoute();
          } else {
            map.once("load", drawRoute);
          }
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
    </div>
  );
}