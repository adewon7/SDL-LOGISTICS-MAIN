import { useState } from "react";
import { ChevronLeft, ArrowRight, Camera, CheckCircle2, Package } from "lucide-react";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Pill } from "../../../components/ui/Pill";
import { EmptyState } from "../../../components/ui/EmptyState";
import { RideMap, type LatLng } from "../../../components/ui/Map";
import { AddressSearch, type PlaceResult } from "../../../components/ui/AddressSearch";
import { useToast } from "../../../components/ui/Toast";
import { fmtN } from "../../../utils/format";
import styles from "./DeliveryBookingPage.module.css";

type Urgency = "Express" | "Same day" | "Scheduled";
const SIZE_OPTIONS = ["Small · under 5 kg", "Medium · 5–20 kg", "Large · 20–100 kg", "Freight · 100 kg+"];

const BASE_COSTS: Record<Urgency, number> = {
  Express: 2450,
  "Same day": 1800,
  Scheduled: 1500,
};

interface DeliveryBookingPageProps {
  back: () => void;
  onTrack: () => void;
  scheduled?: boolean;
}

export function DeliveryBookingPage({ back, onTrack, scheduled }: DeliveryBookingPageProps) {
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [from, setFrom] = useState("14 Ganges Street, Maitama");
  const [to, setTo] = useState("");
  const [pickupCoords, setPickupCoords] = useState<LatLng | null>(null);
  const [destCoords, setDestCoords] = useState<LatLng | null>(null);
  const [routeKm, setRouteKm] = useState<number>(0);
  const [packageType, setPackageType] = useState("Documents");
  const [size, setSize] = useState(SIZE_OPTIONS[0]);
  const [urgency, setUrgency] = useState<Urgency>(scheduled ? "Scheduled" : "Express");
  const [photoAttached, setPhotoAttached] = useState(false);
  const [busy, setBusy] = useState(false);

  const perKm = urgency === "Express" ? 50 : 30;
  const cost = BASE_COSTS[urgency] + Math.round(routeKm * perKm);
  const titles = ["Send a package", "Package details", "Recipient", "Booked"];

  const confirm = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setStep(3);
      showToast("Delivery booked — rider assigned shortly");
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
            <Field label="Drop-off">
              <AddressSearch
                placeholder="Recipient's address"
                onSelect={(place: PlaceResult) => {
                  setTo(place.label);
                  setDestCoords({ lat: place.lat, lng: place.lng });
                }}
              />
            </Field>
            <Field label="Urgency">
              <div className="seg">
                {(["Express", "Same day", "Scheduled"] as Urgency[]).map((u) => (
                  <button key={u} className={urgency === u ? "on" : ""} onClick={() => setUrgency(u)}>
                    {u}
                  </button>
                ))}
              </div>
            </Field>
            {urgency === "Scheduled" && (
              <div className="row">
                <div className="field grow">
                  <label>Date</label>
                  <input type="date" defaultValue="2026-07-21" />
                </div>
                <div className="field grow">
                  <label>Window</label>
                  <select>
                    <option>9 AM – 12 PM</option>
                    <option>12 – 4 PM</option>
                    <option>4 – 8 PM</option>
                  </select>
                </div>
              </div>
            )}
            <div className="mt">
              <Button variant="primary" fullWidth disabled={!to.trim()} onClick={() => setStep(1)}>
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          </>
        )}

        {/* ── Step 1: Package details ── */}
        {step === 1 && (
          <>
            <Field label="Package type">
              <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                <option>Documents</option>
                <option>Food & perishables</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Furniture / bulky</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Size & weight">
              <div className="seg">
                {SIZE_OPTIONS.map((s) => (
                  <button key={s} className={size === s ? "on" : ""} onClick={() => setSize(s)}>
                    {s.split(" ·")[0]}
                  </button>
                ))}
              </div>
              <div className="hint">{size}</div>
            </Field>
            <Field label="Item photo" hint="Helps your rider confirm the right package.">
              <button
                className={`${styles.photoBtn} ${photoAttached ? styles.photoBtnAttached : ""}`}
                onClick={() => setPhotoAttached(!photoAttached)}
              >
                {photoAttached ? (
                  <><CheckCircle2 size={18} /> <b>package_photo.jpg attached</b></>
                ) : (
                  <><Camera size={18} /> <b>Tap to add a photo</b></>
                )}
              </button>
            </Field>
            <Button variant="primary" fullWidth onClick={() => setStep(2)}>
              Continue <ArrowRight size={16} />
            </Button>
          </>
        )}

        {/* ── Step 2: Recipient ── */}
        {step === 2 && (
          <>
            <Field label="Recipient name">
              <input placeholder="Amina Tanko" />
            </Field>
            <Field label="Recipient phone">
              <input placeholder="+234 802 555 0134" inputMode="tel" />
            </Field>
            <Field label="Delivery instructions (optional)">
              <textarea rows={2} placeholder="Call on arrival, leave with security…" />
            </Field>
            <Card className={`row mb ${styles.costCard}`}>
              <div className="grow">
                <div className={`muted ${styles.costLabel}`}>
                  ESTIMATED COST · {urgency.toUpperCase()}{routeKm > 0 ? ` · ${routeKm.toFixed(1)} km` : ""}
                </div>
                <div className={`disp ${styles.costAmount}`}>{fmtN(cost)}</div>
              </div>
              <Pill tone="teal">{packageType}</Pill>
            </Card>
            <Button variant="teal" fullWidth onClick={confirm} disabled={busy}>
              {busy ? "Booking…" : `Book delivery · ${fmtN(cost)}`}
            </Button>
          </>
        )}

        {/* ── Step 3: Booked ── */}
        {step === 3 && (
          <>
            <EmptyState
              icon={<Package size={28} />}
              title="Delivery booked!"
              message="We've shared pickup details with your rider. The recipient will get an SMS with a tracking link."
            />
            <div className={styles.bookedCta}>
              <Button variant="primary" onClick={onTrack}>
                Track delivery <ArrowRight size={16} />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}