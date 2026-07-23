import { Bike as Rider, Bus, Car, CarFront, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { VehicleType } from "../types/common";

export interface VehicleOption {
  id: VehicleType;
  name: string;
  icon: LucideIcon;
  base: number;
  perKm: number;
  cap: string;
  eta: string;
}

export const VEHICLES: VehicleOption[] = [
  { id: "rider", name: "Rider", icon: Rider, base: 600, perKm: 120, cap: "1 passenger · small parcels", eta: "3 min" },
  { id: "car", name: "Car", icon: Car, base: 1200, perKm: 260, cap: "Up to 4 passengers", eta: "5 min" },
  { id: "van", name: "Van", icon: CarFront, base: 3500, perKm: 480, cap: "Bulky goods · up to 800 kg", eta: "12 min" },
  { id: "truck", name: "Truck", icon: Truck, base: 12000, perKm: 950, cap: "Heavy freight · up to 5 t", eta: "25 min" },
  { id: "bus", name: "Bus", icon: Bus, base: 9000, perKm: 700, cap: "Group travel · 14 seats", eta: "18 min" },
];