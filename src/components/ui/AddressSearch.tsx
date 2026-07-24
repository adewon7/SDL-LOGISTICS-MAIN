import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

export interface PlaceResult {
  label: string;
  shortLabel: string;
  lat: number;
  lng: number;
}

interface AddressSearchProps {
  placeholder?: string;
  defaultValue?: string;
  userLocation?: { lat: number; lng: number } | null;
  onSelect: (place: PlaceResult) => void;
}

// Extract a shorter, cleaner place name
function getShortLabel(feature: any): string {
  const text = feature.text ?? "";
  const context = feature.context ?? [];
  const area = context.find((c: any) => c.id?.startsWith("locality") || c.id?.startsWith("neighborhood"))?.text ?? "";
  const city = context.find((c: any) => c.id?.startsWith("place"))?.text ?? "";
  if (area && city) return `${text}, ${area}, ${city}`;
  if (city) return `${text}, ${city}`;
  return text || feature.place_name;
}

export function AddressSearch({
  placeholder = "Search location...",
  defaultValue = "",
  userLocation,
  onSelect,
}: AddressSearchProps) {
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userCity, setUserCity] = useState<string>("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update input when defaultValue changes (e.g. when location is detected)
  useEffect(() => {
    if (defaultValue && defaultValue !== query) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  // Cache the user's city once, when their location is detected —
  // avoids an extra API call on every keystroke
  useEffect(() => {
    if (!userLocation) return;
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation.lng},${userLocation.lat}.json?types=place&language=en&access_token=${TOKEN}`
    )
      .then((r) => r.json())
      .then((data) => {
        const city = data.features?.[0]?.text ?? "";
        setUserCity(city);
      })
      .catch(() => {});
  }, [userLocation]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const search = (value: string) => {
    setQuery(value);
    if (timer.current) clearTimeout(timer.current);

    // Start searching after just 2 characters
    if (value.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const proximity = userLocation
          ? `${userLocation.lng},${userLocation.lat}`
          : "7.4951,9.0579";

        // Auto-append the user's city if they haven't typed it themselves —
        // helps disambiguate places that share a name across Nigeria
        const enhancedQuery =
          userCity && !value.toLowerCase().includes(userCity.toLowerCase())
            ? `${value} ${userCity}`
            : value;

        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(enhancedQuery)}.json?country=NG&proximity=${proximity}&language=en&limit=6&types=address,poi,neighborhood,locality,place,district&fuzzyMatch=true&access_token=${TOKEN}`
        );
        const data = await res.json();
        const places: PlaceResult[] = (data.features ?? []).map((f: any) => ({
          label: f.place_name,
          shortLabel: getShortLabel(f),
          lat: f.center[1],
          lng: f.center[0],
        }));
        setResults(places);
        setOpen(places.length > 0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  const pick = (place: PlaceResult) => {
    setQuery(place.shortLabel);
    setOpen(false);
    setResults([]);
    onSelect(place);
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <div style={{ position: "relative" }}>
        <MapPin
          size={16}
          color="var(--teal)"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => search(e.target.value)}
          onFocus={() => {
            setFocused(true);
            if (results.length > 0) setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%",
            border: `1.5px solid ${focused ? "var(--teal)" : "var(--line)"}`,
            borderRadius: 12,
            padding: "12px 40px 12px 36px",
            font: "inherit",
            fontSize: 14,
            background: "#fff",
            color: "var(--ink)",
            outline: "none",
            transition: "border-color 0.15s",
          }}
        />

        {/* Loading / clear button */}
        {loading ? (
          <span style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 11,
            color: "var(--slate)",
          }}>
            …
          </span>
        ) : query.length > 0 ? (
          <button
            onClick={() => { setQuery(""); setResults([]); setOpen(false); inputRef.current?.focus(); }}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              border: 0,
              background: "none",
              color: "var(--slate)",
              cursor: "pointer",
              fontSize: 16,
              lineHeight: 1,
              padding: 2,
            }}
            aria-label="Clear"
          >
            ×
          </button>
        ) : null}
      </div>

      {/* Suggestions dropdown */}
      {open && results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          left: 0,
          right: 0,
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(11,37,69,.12)",
          zIndex: 999,
          overflow: "hidden",
          maxHeight: 300,
          overflowY: "auto",
        }}>
          {results.map((r, i) => (
            <button
              key={i}
              onMouseDown={(e) => { e.preventDefault(); pick(r); }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 14px",
                border: 0,
                background: "none",
                borderBottom: i < results.length - 1 ? "1px solid var(--line)" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                font: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--blue-soft)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <Navigation
                size={14}
                color="var(--teal)"
                style={{ marginTop: 3, flexShrink: 0 }}
              />
              <span>
                <div style={{ fontSize: 13.5, color: "var(--ink)", fontWeight: 700 }}>
                  {r.shortLabel}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 2, lineHeight: 1.3 }}>
                  {r.label}
                </div>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}