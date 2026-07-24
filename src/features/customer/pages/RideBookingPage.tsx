import { useState } from "react";
import { ChevronLeft, ArrowRight, MapPin, Calendar, Zap, CreditCard, CheckCircle2 } from "lucide-react";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { EmptyState } from "../../../components/ui/EmptyState";
import { RideMap, type LatLng } from "../../../components/ui/Map";
import { AddressSearch, type PlaceResult } from "../../../components/ui/AddressSearch";
import { useToast } from "../../../components/ui/Toast";
import { VEHICLES } from "../../../data/vehicles";
import { ADDRESSES } from "../../../data/customerData";
import { fmtN } from "../../../utils/format";
import type { VehicleType } from "../../../types/common";
import styles from "./RideBookingPage.module.css";

const PASSENGER_OPTIONS = [1, 2, 3, 4, 6, 14];

interface RideBookingPageProps {
  back: () => void;
  onTrack: () => void;
  preset?: VehicleType | null;
}

export function RideBookingPage({ back, onTrack, preset }: RideBookingPageProps) {
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [from, setFrom] = useState("14 Ganges Street, Maitama");
  const [to, setTo] = useState("");
  const [vehicleId, setVehicleId] = useState<VehicleType>(preset ?? "car");
  const [passengers, setPassengers] = useState(1);
  const [when, setWhen] = useState<"now" | "later">("now");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [pickupCoords, setPickupCoords] = useState<LatLng | null>(null);
  const [destCoords, setDestCoords] = useState<LatLng | null>(null);
  const [routeKm, setRouteKm] = useState<number>(8.4);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  const vehicle = VEHICLES.find((v) => v.id === vehicleId)!;
  const fare = Math.round((vehicle.base + vehicle.perKm * routeKm) / 50) * 50;
  const titles = ["Where to?", "Choose your ride", "Review & confirm", "Booked"];

  const confirm = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setStep(3);
      showToast("Booking confirmed — finding your driver");
    }, 1300);
  };

  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={step === 0 ? back : () => setStep(step - 1)} aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <h2>{titles[step]}</h2>
      </div>

      <div className="body">
        {/* ── Step 0: Location ── */}
        {step === 0 && (
          <>
           <RideMap
  pickup={pickupCoords}
  destination={destCoords}
  height={200}
  onDistanceChange={(km: number) => setRouteKm(km)}
  onLocationDetected={(location, address) => {
    setUserLocation(location);
    setPickupCoords(location);
    setFrom(address);
  }}
/>
            <div className="mt" />
            <Field label="Pickup">
              <AddressSearch
                placeholder="Enter pickup location"
                defaultValue={from}
                onSelect={(place: PlaceResult) => {
                  setFrom(place.label);
                  setPickupCoords({ lat: place.lat, lng: place.lng });
                }}
              />
            </Field>
            <Field label="Destination">
              <AddressSearch
                placeholder="Where are you headed?"
                onSelect={(place: PlaceResult) => {
                  setTo(place.label);
                  setDestCoords({ lat: place.lat, lng: place.lng });
                }}
              />
            </Field>
            <div className={styles.addressRow}>
              {ADDRESSES.map((a) => (
                <Button key={a.id} variant="secondary" size="sm" onClick={() => setTo(a.detail)}>
                  <MapPin size={14} /> {a.label}
                </Button>
              ))}
            </div>
            <div className="mt">
              <Button variant="primary" fullWidth disabled={!to.trim()} onClick={() => setStep(1)}>
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          </>
        )}

        {/* ── Step 1: Vehicle & options ── */}
        {step === 1 && (
          <>
            <div className={`${styles.vehicleRow} mb`}>
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  className={`${styles.vehicleCard} ${vehicleId === v.id ? styles.active : ""}`}
                  onClick={() => setVehicleId(v.id)}
                >
                  <v.icon size={24} color={vehicleId === v.id ? "var(--teal)" : "var(--slate)"} />
                  <b>{v.name}</b>
                  <span>{v.eta} away</span>
                </button>
              ))}
            </div>

            <Card className="mb">
              <div className="muted" style={{ fontSize: 12 }}>{vehicle.cap}</div>
            </Card>

            <Field label="Passengers">
              <div className="seg">
                {PASSENGER_OPTIONS.map((n) => (
                  <button key={n} className={passengers === n ? "on" : ""} onClick={() => setPassengers(n)}>
                    {n}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="When">
              <div className="seg">
                <button className={when === "now" ? "on" : ""} onClick={() => setWhen("now")}>
                  <Zap size={14} style={{ verticalAlign: -2 }} /> Pickup now
                </button>
                <button className={when === "later" ? "on" : ""} onClick={() => setWhen("later")}>
                  <Calendar size={14} style={{ verticalAlign: -2 }} /> Schedule
                </button>
              </div>
            </Field>

            {when === "later" && (
              <div className="row">
                <div className="field grow">
                  <label>Date</label>
                  <input type="date" defaultValue="2026-07-20" />
                </div>
                <div className="field grow">
                  <label>Time</label>
                  <input type="time" defaultValue="09:30" />
                </div>
              </div>
            )}

            <Field label="Special instructions (optional)">
              <textarea
                rows={2}
                placeholder="Gate code, landmarks, fragile load…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Field>

            <Card className={`row ${styles.fareCard}`}>
              <div className="grow">
                <div className={`muted ${styles.fareLabel}`}>
                  ESTIMATED FARE · {routeKm.toFixed(1)} km
                </div>
                <div className={`disp ${styles.fareAmount}`}>{fmtN(fare)}</div>
              </div>
              <Pill tone="blue">fixed quote</Pill>
            </Card>

            <div className="mt">
              <Button variant="primary" fullWidth onClick={() => setStep(2)}>
                Review booking
              </Button>
            </div>
          </>
        )}

        {/* ── Step 2: Review ── */}
        {step === 2 && (
          <>
            <Card className="mb">
              {[
                ["Pickup", from],
                ["Destination", to],
                ["Vehicle", `${vehicle.name} · ${passengers} passenger${passengers > 1 ? "s" : ""}`],
                ["When", when === "now" ? "Pickup now" : "Scheduled · Jul 20, 9:30 AM"],
                ["Instructions", note || "—"],
              ].map(([k, v]) => (
                <div key={k} className={styles.detailRow}>
                  <span className={`muted ${styles.detailKey}`}>{k}</span>
                  <b className={styles.detailValue}>{v}</b>
                </div>
              ))}
              <div className={styles.totalRow}>
                <span className="grow h3">Total</span>
                <span className={`disp ${styles.totalAmount}`}>{fmtN(fare)}</span>
              </div>
            </Card>

            <Card className="row mb">
              <CreditCard size={18} color="var(--blue)" />
              <div className="grow">
                <b className={styles.paymentLabel}>Verve •••• 4821</b>
                <div className={`muted ${styles.paymentSub}`}>Default payment method</div>
              </div>
              <Button variant="secondary" size="sm">Change</Button>
            </Card>

            <Button variant="teal" fullWidth onClick={confirm} disabled={busy}>
              {busy ? "Confirming…" : `Confirm · ${fmtN(fare)}`}
            </Button>
          </>
        )}

        {/* ── Step 3: Booked ── */}
        {step === 3 && (
          <>
            <EmptyState
              icon={<CheckCircle2 size={28} />}
              title="You're booked!"
              message={`${vehicle.name} confirmed to ${to}. Your driver is on the way — track them live.`}
            />
            <div className={styles.bookedCta}>
              <Button variant="primary" onClick={onTrack}>
                Track your trip <ArrowRight size={16} />
              </Button>
            </div>
            <Card>
              <div className={`muted ${styles.bookingIdLabel}`}>BOOKING ID</div>
              <b>SDI-90521</b>
            </Card>
          </>
        )}
      </div>
    </>
  );
}