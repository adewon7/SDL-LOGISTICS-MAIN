import React from "react";

interface SpinnerProps {
  dark?: boolean;
}

export function Spinner({ dark }: SpinnerProps) {
  return <span className={`spin ${dark ? "dark" : ""}`} role="status" aria-label="Loading" />;
}