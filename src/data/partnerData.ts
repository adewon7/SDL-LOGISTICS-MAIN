import type { Job, WeeklyEarningPoint } from "../types/partner";

export const JOBS_DONE: Job[] = [
  { id: "J-2291", from: "Wuse Market", to: "Asokoro", pay: 2850, time: "Today · 1:20 PM", rating: 5 },
  { id: "J-2287", from: "Berger Jct", to: "Lugbe", pay: 4100, time: "Today · 11:05 AM", rating: 5 },
  { id: "J-2280", from: "Kado", to: "Katampe Ext", pay: 1900, time: "Yesterday", rating: 4 },
];

export const WEEK_EARN: WeeklyEarningPoint[] = [
  { d: "Mon", v: 14200 }, { d: "Tue", v: 18950 }, { d: "Wed", v: 11400 }, { d: "Thu", v: 21600 },
  { d: "Fri", v: 26300 }, { d: "Sat", v: 30150 }, { d: "Sun", v: 9800 },
];