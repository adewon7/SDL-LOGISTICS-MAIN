import { useState } from "react";
import { Home, History, Shield, User } from "lucide-react";
import { PhoneShell } from "../../components/layout/PhoneShell";
import { BottomNav } from "../../components/layout/BottomNav";
import { useToast } from "../../components/ui/Toast";
import { OnboardingPage } from "./pages/OnboardingPage";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";
import { RideBookingPage } from "./pages/RideBookingPage";
import { DeliveryBookingPage } from "./pages/DeliveryBookingPage";
import { TrackingPage } from "./pages/TrackingPage";
import { RatingPage } from "./pages/RatingPage";
import { HistoryPage } from "./pages/HistoryPage";
import { SafetyPage } from "./pages/SafetyPage";
import { ChatPage } from "./pages/ChatPage";
import { CallPage } from "./pages/CallPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { AddressesPage } from "./pages/AddressesPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { ProfilePage } from "./pages/ProfilePage";
import type { VehicleType } from "../../types/common";

type CustomerScreen =
  | "onboard" | "auth" | "home" | "ride" | "delivery" | "tracking" | "rate"
  | "history" | "safety" | "chat" | "call" | "notifs" | "addresses" | "payments" | "profile";

const NAV_ITEMS = [
  { key: "home", icon: Home, label: "Home" },
  { key: "history", icon: History, label: "Bookings" },
  { key: "safety", icon: Shield, label: "Safety" },
  { key: "profile", icon: User, label: "Profile" },
];

const NO_NAV_SCREENS: CustomerScreen[] = ["ride", "delivery", "tracking", "rate", "chat", "call"];

export function CustomerApp() {
  const { showToast } = useToast();
  const [screen, setScreen] = useState<CustomerScreen>("onboard");
  const [ridePreset, setRidePreset] = useState<VehicleType | null>(null);
  const [schedDelivery, setSchedDelivery] = useState(false);

  const nav = (s: CustomerScreen) => setScreen(s);
  const inApp = screen !== "onboard" && screen !== "auth";
  const showNav = inApp && !NO_NAV_SCREENS.includes(screen);

  return (
    <PhoneShell>
      {screen === "onboard" && <OnboardingPage onDone={() => nav("auth")} />}
      {screen === "auth" && (
        <AuthPage onDone={() => { nav("home"); showToast("Welcome back, Ololade!"); }} />
      )}
      {screen === "home" && (
        <HomePage
          onBookRide={(preset) => { setRidePreset(preset); nav("ride"); }}
          onBookDelivery={(scheduled) => { setSchedDelivery(scheduled); nav("delivery"); }}
          onTrack={() => nav("tracking")}
          onSafety={() => nav("safety")}
          onNotifications={() => nav("notifs")}
          onSeeHistory={() => nav("history")}
        />
      )}
      {screen === "ride" && (
        <RideBookingPage back={() => nav("home")} onTrack={() => nav("tracking")} preset={ridePreset} />
      )}
      {screen === "delivery" && (
        <DeliveryBookingPage back={() => nav("home")} onTrack={() => nav("tracking")} scheduled={schedDelivery} />
      )}
      {screen === "tracking" && (
        <TrackingPage back={() => nav("home")} onDone={() => nav("rate")} onChat={() => nav("chat")} onCall={() => nav("call")} />
      )}
      {screen === "rate" && <RatingPage back={() => nav("home")} />}
      {screen === "history" && <HistoryPage back={() => nav("home")} onOpen={() => nav("tracking")} />}
      {screen === "safety" && <SafetyPage back={() => nav("home")} />}
      {screen === "chat" && <ChatPage back={() => nav("tracking")} />}
      {screen === "call" && <CallPage back={() => nav("tracking")} />}
      {screen === "notifs" && <NotificationsPage back={() => nav("home")} />}
      {screen === "addresses" && <AddressesPage back={() => nav("profile")} />}
      {screen === "payments" && <PaymentsPage back={() => nav("profile")} />}
      {screen === "profile" && (
        <ProfilePage
          onAddresses={() => nav("addresses")}
          onPayments={() => nav("payments")}
          onNotifications={() => nav("notifs")}
          onSafety={() => nav("safety")}
          onSignOut={() => nav("auth")}
        />
      )}

      {showNav && (
        <BottomNav items={NAV_ITEMS} active={screen} onSelect={(key) => nav(key as CustomerScreen)} />
      )}
    </PhoneShell>
  );
}