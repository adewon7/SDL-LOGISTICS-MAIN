export interface AdminCustomer {
  id: string;
  name: string;
  trips: number;
  spend: number;
  status: "active" | "suspended";
}

export interface AdminPartner {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  trips: number;
  status: "online" | "offline" | "suspended";
}

export interface VerificationRequest {
  id: string;
  name: string;
  vehicle: string;
  docs: string[];
  submitted: string;
}

export interface LiveTrip {
  id: string;
  partner: string;
  kind: "ride" | "delivery";
  route: string;
  eta: string;
  status: "intransit" | "enroute" | "assigned" | "arrived" | "searching";
}

export interface Payout {
  id: string;
  partner: string;
  amount: number;
  period: string;
  status: "paid" | "pending";
}

export interface Complaint {
  id: string;
  user: string;
  subject: string;
  trip: string;
  status: "open" | "investigating" | "resolved";
  age: string;
}

export interface Promo {
  code: string;
  desc: string;
  uses: number;
  cap: number;
  active: boolean;
}

export interface TripsTrendPoint {
  d: string;
  trips: number;
  rev: number;
}