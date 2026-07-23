import React from "react";
import { Navigation } from "lucide-react";
import type { UserRole } from "../../types/common";

interface RoleBarProps {
  role: UserRole;
  onChange: (role: UserRole) => void;
}

const ROLES: { key: UserRole; label: string }[] = [
  { key: "customer", label: "Customer" },
  { key: "partner", label: "Partner" },
  { key: "admin", label: "Admin" },
];

export function RoleBar({ role, onChange }: RoleBarProps) {
  return (
    <header className="rolebar">
      <div className="logo">
        <Navigation size={18} color="#5EEAD4" /> SDI <em>Logistics</em>
      </div>
      <div className="roleseg" role="tablist" aria-label="Choose experience">
        {ROLES.map(({ key, label }) => (
          <button key={key} className={role === key ? "on" : ""} onClick={() => onChange(key)} role="tab" aria-selected={role === key}>
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}