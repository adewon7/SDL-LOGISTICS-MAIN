import { Pill, type PillTone } from "./Pill";

type Status =
  | "searching"
  | "assigned"
  | "enroute"
  | "arrived"
  | "intransit"
  | "completed"
  | "cancelled"
  | "paid"
  | "pending"
  | "failed"
  | "online"
  | "offline"
  | "suspended"
  | "active"
  | "paused"
  | "open"
  | "investigating"
  | "resolved";

interface StatusPillProps {
  status: Status;
}

const STATUS_TONES: Record<Status, PillTone> = {
  searching: "gray",
  assigned: "blue",
  enroute: "blue",
  arrived: "amber",
  intransit: "teal",
  completed: "green",
  cancelled: "red",
  paid: "green",
  pending: "amber",
  failed: "red",
  online: "green",
  offline: "gray",
  suspended: "red",
  active: "green",
  paused: "gray",
  open: "red",
  investigating: "amber",
  resolved: "green",
};

export function StatusPill({ status }: StatusPillProps) {
  return <Pill tone={STATUS_TONES[status]}>{status}</Pill>;
}