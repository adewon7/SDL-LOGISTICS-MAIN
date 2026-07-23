export interface Address {
  id: number;
  label: string;
  detail: string;
}

export interface PaymentCard {
  id: number;
  brand: string;
  last4: string;
  exp: string;
}

export interface Notification {
  id: number;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export interface Driver {
  name: string;
  vehicle: string;
  plate: string;
  rating: number;
  trips: number;
}