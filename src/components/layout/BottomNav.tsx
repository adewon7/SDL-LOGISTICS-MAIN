import React from "react";
import type { LucideIcon } from "lucide-react";


export interface BottomNavItem {
  key: string;
  icon: LucideIcon;
  label: string;
}

interface BottomNavProps {
  items: BottomNavItem[];
  active: string;
  onSelect: (key: string) => void;
}

export function BottomNav({ items, active, onSelect }: BottomNavProps) {
  return (
    <nav className="bottomnav">
      {items.map(({ key, icon: Icon, label }) => (
        <button key={key} className={active === key ? "on" : ""} onClick={() => onSelect(key)}>
          <Icon size={19} />
          {label}
        </button>
      ))}
    </nav>
  );
}
