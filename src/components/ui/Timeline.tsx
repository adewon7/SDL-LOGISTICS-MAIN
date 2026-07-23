import React from "react";
import { Check, Circle } from "lucide-react";

export interface TimelineStep {
  t: string;
  d: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  active: number;
}

export function Timeline({ steps, active }: TimelineProps) {
  return (
    <div className="tl">
      {steps.map((s, i) => (
        <div key={s.t} className={`step ${i < active ? "done" : i === active ? "now" : "pending"}`}>
          <span className="k">{i < active ? <Check size={10} /> : <Circle size={7} />}</span>
          <div className="t">{s.t}</div>
          <div className="muted" style={{ fontSize: 12 }}>{s.d}</div>
        </div>
      ))}
    </div>
  );
}