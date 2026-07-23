import type { Booking } from "../types/booking";
import type { Address, PaymentCard, Notification, Driver } from "../types/customer";

export const DRIVER: Driver = {
  name: "Emeka Obi",
  vehicle: "Toyota Hiace · Silver",
  plate: "ABJ-482-KJA",
  rating: 4.9,
  trips: 2314,
};

export const HISTORY: Booking[] = [
  { id: "SDI-90412", kind: "ride", from: "Wuse 2", to: "Garki Area 11", vehicle: "car", fare: 3400, status: "completed", date: "Jul 12" },
  { id: "SDI-90371", kind: "delivery", from: "Jabi Lake Mall", to: "Maitama", vehicle: "car", fare: 1750, status: "completed", date: "Jul 10" },
  { id: "SDI-90218", kind: "ride", from: "Airport Rd", to: "Central Area", vehicle: "van", fare: 8900, status: "cancelled", date: "Jul 06" },
  { id: "SDI-90104", kind: "delivery", from: "Gwarinpa", to: "Kubwa", vehicle: "van", fare: 6200, status: "completed", date: "Jul 02" },
  { id: "SDI-89876", kind: "ride", from: "Utako", to: "Life Camp", vehicle: "truck", fare: 18500, status: "completed", date: "Jun 27" },
];

export const ADDRESSES: Address[] = [
  { id: 1, label: "Home", detail: "14 Ganges Street, Maitama" },
  { id: 2, label: "Work", detail: "Plot 227 Solomon Lar Way, Utako" },
];

export const CARDS: PaymentCard[] = [
  { id: 1, brand: "Verve", last4: "4821", exp: "09/27" },
  { id: 2, brand: "Mastercard", last4: "0834", exp: "02/28" },
];

export const NOTIFS: Notification[] = [
  { id: 1, title: "Driver arriving", body: "Emeka is 2 minutes away from your pickup.", time: "2m", unread: true },
  { id: 2, title: "Package delivered", body: "SDI-90371 was received by Amina T.", time: "2d", unread: true },
  { id: 3, title: "Weekend promo", body: "Use MOVE15 for 15% off van bookings.", time: "4d", unread: false },
];