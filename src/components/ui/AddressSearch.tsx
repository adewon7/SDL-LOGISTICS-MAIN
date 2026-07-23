import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

export interface PlaceResult {
  label: string;
  lat: number;
  lng: number;
}

interface AddressSearchProps {
  placeholder?: string;
  defaultValue?: string;
  onSelect: (place: PlaceResult) => void;
}

export function AddressSearch({
  placeholder = "Search location...",
  defaultValue = "",
  onSelect,
}: AddressSearchProps) {
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const search = (value: string) => {
    setQuery(value);
    if (timer.current) clearTimeout(timer.current);
    if (value.trim().length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }

    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?country=NG&proximity=7.4951,9.0579&language=en&limit=6&access_token=${TOKEN}`
        );
        const data = await res.json();
        const places: PlaceResult[] = (data.features ?? []).map((f: any) => ({
          label: f.place_name,
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
    }, 300);
  };

  const pick = (place: PlaceResult) => {
    setQuery(place.label);
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
          }}
        />
        <input
          value={query}
          onChange={(e) => search(e.target.value)}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--teal)";
            if (results.length > 0) setOpen(true);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--line)";
          }}
          placeholder={placeholder}
          style={{
            width: "100%",
            border: "1.5px solid var(--line)",
            borderRadius: 12,
            padding: "12px 14px 12px 36px",
            font: "inherit",
            fontSize: 14,
            background: "#fff",
            color: "var(--ink)",
            outline: "none",
          }}
        />
        {loading && (
          <span style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 11,
            color: "var(--slate)",
          }}>
            searching…
          </span>
        )}
      </div>

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
          maxHeight: 280,
          overflowY: "auto",
        }}>
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => pick(r)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "11px 14px",
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
              <MapPin size={14} color="var(--slate)" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.4 }}>{r.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}