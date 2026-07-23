import { useState } from "react";
import { CustomerApp } from "./features/customer/CustomerApp";
import { PartnerApp } from "./features/partner/PartnerApp";
import { AdminApp } from "./features/admin/AdminApp";
import { RoleBar } from "./components/layout/RoleBar";
import { ToastProvider } from "./components/ui/Toast";
import type { UserRole } from "./types/common";
import Map from "./Map";

import "./styles/globals.css";

export default function App() {
  const [role, setRole] = useState<UserRole>("customer");

  return (
    <div className="sdi">
      <ToastProvider>
        <RoleBar role={role} onChange={setRole} />
        {role === "customer" && <CustomerApp />}
        {role === "partner" && <PartnerApp />}
        {role === "admin" && <AdminApp />}
      </ToastProvider>
    </div>
  );
}
