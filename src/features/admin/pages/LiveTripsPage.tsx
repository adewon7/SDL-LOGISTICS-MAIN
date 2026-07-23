import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { Button } from "../../../components/ui/Button";
import { StatusPill } from "../../../components/ui/StatusPill";
import { LIVE_TRIPS } from "../../../data/adminData";
import styles from "./LiveTripsPage.module.css";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;
mapboxgl.accessToken = TOKEN;

const FLEET_VEHICLES: {
  id: string;
  position: [number, number]; // [lng, lat] for Mapbox
  label: string;
  emoji: string;
  color: string;
}[] = [
  { id: "SDI-90514", position: [7.4836, 9.0764], label: "Sani · Wuse 2 → Maitama", emoji: "🛵", color: "#0E9F8A" },
  { id: "SDI-90513", position: [7.4453, 9.0670], label: "Emeka · Jabi → Airport", emoji: "🚗", color: "#14509E" },
  { id: "SDI-90511", position: [7.4239, 9.0142], label: "Tope · Idu → Karu", emoji: "🚐", color: "#B45309" },
];

const ABUJA_CENTER: [number, number] = [7.4951, 9.0579];

export function LiveTripsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: ABUJA_CENTER,
      zoom: 11,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      FLEET_VEHICLES.forEach((v) => {
        // Custom marker element
        const el = document.createElement("div");
        el.style.cssText = `
          background:${v.color};
          border:2px solid #fff;
          border-radius:50%;
          width:36px;height:36px;
          display:flex;align-items:center;justify-content:center;
          font-size:16px;
          box-shadow:0 2px 8px rgba(0,0,0,.25);
          cursor:pointer;
        `;
        el.textContent = v.emoji;

        new mapboxgl.Marker({ element: el })
          .setLngLat(v.position)
          .setPopup(
            new mapboxgl.Popup({ offset: 20 }).setHTML(`
              <div style="font-family:Manrope,sans-serif;min-width:160px">
                <b style="font-size:13px">${v.id}</b><br/>
                <span style="font-size:12px;color:#5B6B81">${v.label}</span>
              </div>
            `)
          )
          .addTo(mapRef.current!);
      });

      // Fit to all vehicles
      const bounds = FLEET_VEHICLES.reduce(
        (b, v) => b.extend(v.position),
        new mapboxgl.LngLatBounds(FLEET_VEHICLES[0].position, FLEET_VEHICLES[0].position)
      );
      mapRef.current!.fitBounds(bounds, { padding: 80 });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <PageHeader
        title="Live trips & deliveries"
        sub="Real-time monitoring · Abuja zone"
        right={<Pill tone="green">3 active</Pill>}
      />
      <div className="grid2">
        {/* Fleet map */}
        <div className={styles.mapWrapper}>
          <div ref={containerRef} className={styles.mapContainer} />
          <div className={styles.legend}>
            {FLEET_VEHICLES.map((v) => (
              <div key={v.id} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: v.color }} />
                <span className={styles.legendLabel}>{v.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trip list */}
        <div>
          {LIVE_TRIPS.map((t) => (
            <Card key={t.id} className="row mb">
              <div className="grow">
                <div className="row" style={{ gap: 8 }}>
                  <b className={styles.tripId}>{t.id}</b>
                  <StatusPill status={t.status} />
                </div>
                <div className={`muted ${styles.tripRoute}`}>{t.route} · {t.partner}</div>
              </div>
              <div className={styles.tripRight}>
                <b className={styles.tripEta}>ETA {t.eta}</b>
                <div className={styles.tripAction}>
                  <Button variant="ghost" size="sm">Monitor</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}