import React from "react";
import type { LucideIcon } from "lucide-react";

export interface AdminNavItem {
  key: string;
  icon: LucideIcon;
  label: string;
}

interface AdminSidebarProps {
  items: AdminNavItem[];
  active: string;
  onSelect: (key: string) => void;
}

export function AdminSidebar({ items, active, onSelect }: AdminSidebarProps) {
  return (
    <aside className="sidenav">
      <div className="disp" style={{ fontWeight: 700, padding: "4px 12px 16px", fontSize: 15, color: "var(--navy)" }}>
        SDI <span style={{ color: "var(--teal)" }}>Admin</span>
      </div>
      {items.map(({ key, icon: Icon, label }) => (
        <button key={key} className={active === key ? "on" : ""} onClick={() => onSelect(key)}>
          <Icon size={17} />
          <span>{label}</span>
        </button>
      ))}
    </aside>
  );
}