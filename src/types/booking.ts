import type { BookingStatus, VehicleType } from "./common";

export type BookingKind = "ride" | "delivery";

export interface Booking {
  id: string;
  kind: BookingKind;
  from: string;
  to: string;
  vehicle: VehicleType;
  fare: number;
  status: BookingStatus;
  date: string;
}