import { useState } from "react";
import { Shield } from "lucide-react";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button"; // ASSUMED props — confirm against real Button.tsx
import { Card } from "../../../components/ui/Card";       // ASSUMED props: children, style — confirm against real Card.tsx
import { Spinner } from "../../../components/ui/Spinner";

type AuthMode = "signin" | "signup";

interface AuthPageProps {
  onDone: () => void;
}

export function AuthPage({ onDone }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [busy, setBusy] = useState(false);

  const submit = () => {
    setBusy(true);
    setTimeout(onDone, 900);
  };

  return (
    <div className="body" style={{ paddingTop: 34 }}>
      <h1 style={{ fontSize: 24 }}>{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
      <p className="muted" style={{ margin: "6px 0 22px" }}>
        {mode === "signin" ? "Sign in to keep moving." : "Join thousands moving smarter with SDI."}
      </p>

      {mode === "signup" && (
        <Field label="Full name">
          <input placeholder="Ololade Adebayo" />
        </Field>
      )}

      <Field label="Phone number">
        <input placeholder="+234 801 234 5678" inputMode="tel" />
      </Field>

      <Field label="Password" hint={mode === "signup" ? "At least 8 characters." : undefined}>
        <input type="password" placeholder="••••••••" />
      </Field>

      <Button variant="primary" fullWidth onClick={submit} disabled={busy}>
        {busy ? <Spinner /> : mode === "signin" ? "Sign in" : "Create account"}
      </Button>

      <p className="muted" style={{ textAlign: "center", marginTop: 16 }}>
        {mode === "signin" ? "New to SDI? " : "Already registered? "}
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          style={{ border: 0, background: "none", color: "var(--teal)", fontWeight: 800 }}
        >
          {mode === "signin" ? "Create account" : "Sign in"}
        </button>
      </p>

      <Card style={{ background: "var(--teal-soft)", border: 0, marginTop: 14 }}>
        <div className="row">
          <Shield size={18} color="var(--teal)" />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--teal)" }}>
            Demo prototype — any details work. Nothing is stored or verified.
          </span>
        </div>
      </Card>
    </div>
  );
}