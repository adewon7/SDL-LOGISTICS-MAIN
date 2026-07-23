export interface Job {
  id: string;
  from: string;
  to: string;
  pay: number;
  time: string;
  rating: number;
}

export interface WeeklyEarningPoint {
  d: string;
  v: number;
}