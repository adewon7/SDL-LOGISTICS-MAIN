import type {
  TripsTrendPoint, AdminCustomer, AdminPartner, VerificationRequest, LiveTrip, Payout, Complaint, Promo
} from "../types/admin";

export const TRIPS_TREND: TripsTrendPoint[] = [
  { d: "Jul 8", trips: 412, rev: 1.21 }, { d: "Jul 9", trips: 468, rev: 1.38 }, { d: "Jul 10", trips: 445, rev: 1.30 },
  { d: "Jul 11", trips: 530, rev: 1.62 }, { d: "Jul 12", trips: 604, rev: 1.85 }, { d: "Jul 13", trips: 571, rev: 1.71 },
  { d: "Jul 14", trips: 358, rev: 1.02 },
];

export const ADMIN_CUSTOMERS: AdminCustomer[] = [
  { id: "C-1042", name: "Ololade A.", trips: 86, spend: 412500, status: "active" },
  { id: "C-0977", name: "Amina Tanko", trips: 41, spend: 188200, status: "active" },
  { id: "C-0913", name: "Kunle Bassey", trips: 12, spend: 51900, status: "suspended" },
  { id: "C-0866", name: "Ngozi Eze", trips: 133, spend: 743100, status: "active" },
];

export const ADMIN_PARTNERS: AdminPartner[] = [
  { id: "P-3301", name: "Emeka Obi", vehicle: "Van", rating: 4.9, trips: 2314, status: "online" },
  { id: "P-3287", name: "Sani Yusuf", vehicle: "Bike", rating: 4.7, trips: 1180, status: "online" },
  { id: "P-3244", name: "Tope Alabi", vehicle: "Truck", rating: 4.8, trips: 640, status: "offline" },
  { id: "P-3199", name: "Chidi Okon", vehicle: "Car", rating: 4.5, trips: 902, status: "suspended" },
];

export const VERIF_QUEUE: VerificationRequest[] = [
  { id: "P-3412", name: "Bello Hassan", vehicle: "Bike", docs: ["Driver's licence", "Vehicle papers", "ID card"], submitted: "2h ago" },
  { id: "P-3410", name: "Grace Adeyemi", vehicle: "Van", docs: ["Driver's licence", "Insurance", "ID card"], submitted: "5h ago" },
  { id: "P-3402", name: "Musa Ibrahim", vehicle: "Truck", docs: ["Driver's licence", "Roadworthiness", "ID card"], submitted: "1d ago" },
];

export const LIVE_TRIPS: LiveTrip[] = [
  { id: "SDI-90514", partner: "Sani Yusuf", kind: "delivery", route: "Wuse 2 → Maitama", eta: "6 min", status: "intransit" },
  { id: "SDI-90513", partner: "Emeka Obi", kind: "ride", route: "Jabi → Airport", eta: "22 min", status: "enroute" },
  { id: "SDI-90511", partner: "Tope Alabi", kind: "delivery", route: "Idu → Karu", eta: "38 min", status: "intransit" },
];

export const PAYOUTS: Payout[] = [
  { id: "PO-8841", partner: "Emeka Obi", amount: 96400, period: "Jul 1–7", status: "paid" },
  { id: "PO-8840", partner: "Sani Yusuf", amount: 54100, period: "Jul 1–7", status: "paid" },
  { id: "PO-8852", partner: "Tope Alabi", amount: 71800, period: "Jul 8–14", status: "pending" },
];

export const COMPLAINTS: Complaint[] = [
  { id: "T-1120", user: "Ngozi Eze", subject: "Overcharged on toll fee", trip: "SDI-90477", status: "open", age: "3h" },
  { id: "T-1114", user: "Kunle Bassey", subject: "Driver arrived late", trip: "SDI-90398", status: "investigating", age: "1d" },
  { id: "T-1098", user: "Amina Tanko", subject: "Damaged parcel corner", trip: "SDI-90371", status: "resolved", age: "3d" },
];

export const PROMOS: Promo[] = [
  { code: "MOVE15", desc: "15% off van bookings", uses: 412, cap: 1000, active: true },
  { code: "FIRSTRIDE", desc: "₦1,000 off first trip", uses: 2210, cap: 5000, active: true },
  { code: "JUNEFREIGHT", desc: "10% off truck hire", uses: 388, cap: 400, active: false },
];