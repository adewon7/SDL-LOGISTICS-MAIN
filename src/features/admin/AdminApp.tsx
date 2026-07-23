import { useState } from "react";
import {
  LayoutDashboard, Users, CarFront, FileCheck, Map, Percent,
  BadgeDollarSign, MessagesSquare, Tag, BarChart3,
} from "lucide-react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { OverviewPage } from "./pages/OverviewPage";
import { CustomersPage } from "./pages/CustomersPage";
import { PartnersPage } from "./pages/PartnersPage";
import { VerificationQueuePage } from "./pages/VerificationQueuePage";
import { LiveTripsPage } from "./pages/LiveTripsPage";
import { PricingPage } from "./pages/PricingPage";
import { PaymentsPayoutsPage } from "./pages/PaymentsPayoutsPage";
import { ComplaintsPage } from "./pages/ComplaintsPage";
import { PromosPage } from "./pages/PromosPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";

type AdminPage =
  | "overview" | "customers" | "partners" | "verify" | "live"
  | "pricing" | "payments" | "complaints" | "promos" | "analytics";

const NAV_ITEMS = [
  { key: "overview", icon: LayoutDashboard, label: "Overview" },
  { key: "customers", icon: Users, label: "Customers" },
  { key: "partners", icon: CarFront, label: "Partners" },
  { key: "verify", icon: FileCheck, label: "Verification" },
  { key: "live", icon: Map, label: "Live trips" },
  { key: "pricing", icon: Percent, label: "Pricing" },
  { key: "payments", icon: BadgeDollarSign, label: "Payments" },
  { key: "complaints", icon: MessagesSquare, label: "Complaints" },
  { key: "promos", icon: Tag, label: "Promos" },
  { key: "analytics", icon: BarChart3, label: "Analytics" },
];

export function AdminApp() {
  const [page, setPage] = useState<AdminPage>("overview");

  return (
    <AdminLayout
      sidebar={<AdminSidebar items={NAV_ITEMS} active={page} onSelect={(key) => setPage(key as AdminPage)} />}
    >
      {page === "overview" && <OverviewPage onReviewQueue={() => setPage("verify")} />}
      {page === "customers" && <CustomersPage />}
      {page === "partners" && <PartnersPage />}
      {page === "verify" && <VerificationQueuePage />}
      {page === "live" && <LiveTripsPage />}
      {page === "pricing" && <PricingPage />}
      {page === "payments" && <PaymentsPayoutsPage />}
      {page === "complaints" && <ComplaintsPage />}
      {page === "promos" && <PromosPage />}
      {page === "analytics" && <AnalyticsPage />}
    </AdminLayout>
  );
}