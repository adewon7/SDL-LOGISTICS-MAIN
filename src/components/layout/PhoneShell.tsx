import React, { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return <div className="shell">{children}</div>;
}