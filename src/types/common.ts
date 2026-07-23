export type UserRole = "customer" | "partner" | "admin";

export type VehicleType = "rider" | "car" | "van" | "truck" | "bus";

export type BookingStatus =
  | "searching"
  | "assigned"
  | "enroute"
  | "arrived"
  | "intransit"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export type PartnerStatus = "online" | "offline" | "suspended";

export type ToastTone = "ok" | "err";