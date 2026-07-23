import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Phone, MessageCircle, Star, Share2, ChevronUp, ChevronDown } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Avatar } from "../../../components/ui/Avatar";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { Timeline } from "../../../components/ui/Timeline";
import { DRIVER } from "../../../data/customerData";
import styles from "./TrackingPage.module.css";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;
mapboxgl.accessToken = TOKEN;

// Wuse 2 → Garki Area 11 (Abuja) — [lng, lat] for Mapbox
const PICKUP: [number, number] = [7.4836, 9.0764];
const DESTINATION: [number, number] = [7.4833, 9.0422];
const AVG_SPEED_KMH = 35;

const TRIP_STEPS = [
  { t: "Driver assigned", d: "Emeka accepted your request" },
  { t: "En route to pickup", d: "About 4 minutes away" },
  { t: "Arrived at pickup", d: "Meet at the main gate" },
  { t: "Trip in progress", d: "Heading to destination" },
  { t: "Completed", d: "Rate your experience" },
];

// Driver marker element
function createDriverEl() {
  const el = document.createElement("div");
  el.style.cssText = `
    width:36px;height:36px;border-radius:50%;
    background:#0E9F8A;border:3px solid #fff;
    box-shadow:0 2px 12px rgba(0,0,0,.35);
    display:flex;align-items:center;justify-content:center;
    font-size:16px;
  `;
  el.textContent = "🚗";
  return el;
}

interface TrackingPageProps {
  back: () => void;
  onDone: () => void;
  onChat: () => void;
  onCall: () => void;
}

export function TrackingPage({ back, onDone, onChat, onCall }: TrackingPageProps) {
  const [phase, setPhase] = useState(1);
  const [etaMin, setEtaMin] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const driverMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const routeCoordsRef = useRef<[number, number][]>([]);
  const totalDurationRef = useRef<number>(16800);

  // Advance phases
  useEffect(() => {
    if (phase >= 4) return;
    const t = setTimeout(() => setPhase((p) => p + 1), 4200);
    return () => clearTimeout(t);
  }, [phase]);

  // Update ETA as phase advances
  useEffect(() => {
    if (distanceKm === null) return;
    const remainingFraction = Math.max(0, (4 - phase) / 4);
    const mins = Math.round((distanceKm * remainingFraction) / AVG_SPEED_KMH * 60);
    setEtaMin(mins);
  }, [phase, distanceKm]);

  // Init Mapbox map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: PICKUP,
      zoom: 13,
      attributionControl: false,
    });

    // Pickup + destination markers
    new mapboxgl.Marker({ color: "#0E9F8A" })
      .setLngLat(PICKUP)
      .setPopup(new mapboxgl.Popup().setText("📍 Pickup · Wuse 2"))
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: "#0B2545" })
      .setLngLat(DESTINATION)
      .setPopup(new mapboxgl.Popup().setText("🏁 Destination · Garki Area 11"))
      .addTo(mapRef.current);

    // Driver marker
    driverMarkerRef.current = new mapboxgl.Marker({ element: createDriverEl() })
      .setLngLat(PICKUP)
      .addTo(mapRef.current);

    // Fetch real route from Mapbox Directions
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${PICKUP[0]},${PICKUP[1]};${DESTINATION[0]},${DESTINATION[1]}?geometries=geojson&access_token=${TOKEN}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (!data.routes?.[0]) return;
        const route = data.routes[0];
        const km = route.distance / 1000;
        setDistanceKm(km);
        setEtaMin(Math.round((km / AVG_SPEED_KMH) * 60));
        routeCoordsRef.current = route.geometry.coordinates;
        totalDurationRef.current = 4 * 4200;

        const drawRoute = () => {
          if (!mapRef.current) return;
          mapRef.current.addSource("route", {
            type: "geojson",
            data: { type: "Feature", properties: {}, geometry: route.geometry },
          });
          mapRef.current.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#14509E", "line-width": 5, "line-opacity": 0.8 },
          });

          // Fit to route
          const coords = route.geometry.coordinates as [number, number][];
          const bounds = coords.reduce(
            (b: mapboxgl.LngLatBounds, c: [number, number]) => b.extend(c),
            new mapboxgl.LngLatBounds(coords[0], coords[0])
          );
          mapRef.current.fitBounds(bounds, { padding: 80 });
          startAnimation(route.geometry.coordinates);
        };

        if (mapRef.current?.isStyleLoaded()) drawRoute();
else mapRef.current?.once("load", drawRoute);
      })
      .catch(() => {
        setDistanceKm(4.5);
        setEtaMin(8);
        startAnimation([PICKUP, DESTINATION]);
      });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const startAnimation = (coords: [number, number][]) => {
    startTimeRef.current = performance.now();
    const duration = totalDurationRef.current;
    const step = (now: number) => {
      if (!startTimeRef.current) return;
      const progress = Math.min((now - startTimeRef.current) / duration, 1);
      const pos = coords[Math.min(Math.floor(progress * (coords.length - 1)), coords.length - 1)];
      driverMarkerRef.current?.setLngLat(pos as mapboxgl.LngLatLike);
      if (progress < 1) animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
  };

  const etaLabel = etaMin === null
    ? "Calculating…"
    : etaMin === 0 ? "Arriving now"
    : `${etaMin} min away`;

  return (
    <div className={styles.page}>
      <div ref={containerRef} className={styles.mapContainer} />

      {/* Top bar */}
      <div className={styles.topBar}>
        <button
          onClick={back}
          aria-label="Back"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: 12,
            border: "none", background: "var(--navy)", color: "#fff",
            cursor: "pointer", flexShrink: 0,
          }}
        >
          <ChevronLeft size={20} strokeWidth={2.8} />
        </button>
        <h2 className={styles.title}>Live tracking</h2>
        <Pill tone="teal">{etaLabel}</Pill>
      </div>

      {/* ETA badge */}
      {distanceKm !== null && (
        <div className={styles.etaBadge}>
          <span>📍 {distanceKm.toFixed(1)} km</span>
          <span className={styles.etaDivider}>|</span>
          <span>⏱ {etaLabel}</span>
        </div>
      )}

      {/* Bottom panel */}
      <div className={styles.bottomPanel}>
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className={styles.handle}
          aria-label={panelOpen ? "Collapse panel" : "Expand panel"}
        >
          <div className={styles.handleBar} />
          {panelOpen
            ? <ChevronDown size={14} color="var(--slate)" />
            : <ChevronUp size={14} color="var(--slate)" />}
        </button>

        {panelOpen && (
          <div className={styles.panelContent}>
            <div className={styles.driverCard}>
              <Avatar name={DRIVER.name} />
              <div className={styles.driverInfo}>
                <b className={styles.driverName}>{DRIVER.name}</b>
                <div className={`muted ${styles.driverSub}`}>{DRIVER.vehicle} · {DRIVER.plate}</div>
                <div className={styles.driverRating}>
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <b className={styles.ratingValue}>{DRIVER.rating}</b>
                  <span className={`muted ${styles.ratingTrips}`}>· {DRIVER.trips.toLocaleString()} trips</span>
                </div>
              </div>
              <button className="iconbtn" aria-label="Call driver" onClick={onCall}>
                <Phone size={17} color="var(--teal)" />
              </button>
              <button className="iconbtn" aria-label="Chat with driver" onClick={onChat}>
                <MessageCircle size={17} color="var(--blue)" />
              </button>
            </div>

            <Card className={styles.timelineCard}>
              <div className="h3 mb">Trip progress</div>
              <Timeline steps={TRIP_STEPS} active={Math.min(phase, 4)} />
            </Card>

            <div className={styles.actions}>
              <div className={styles.actionBtn}>
                <Button variant="secondary" fullWidth>
                  <Share2 size={15} /> Share trip
                </Button>
              </div>
              <div className={styles.actionBtn}>
                {phase >= 4
                  ? <Button variant="teal" fullWidth onClick={onDone}>Rate trip</Button>
                  : <Button variant="danger" fullWidth onClick={back}>Cancel</Button>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}