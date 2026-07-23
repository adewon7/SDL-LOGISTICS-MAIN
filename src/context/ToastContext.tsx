import React, { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { ToastTone } from "../types/common";

interface ToastItem {
  id: number;
  msg: string;
  tone: ToastTone;
}

type ToastFn = (msg: string, tone?: ToastTone) => void;

const ToastCtx = createContext<ToastFn | null>(null);

export function ToastHost({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push: ToastFn = (msg, tone = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`}>
            {t.tone === "ok" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />} {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = (): ToastFn => {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within a ToastHost");
  return ctx;
};