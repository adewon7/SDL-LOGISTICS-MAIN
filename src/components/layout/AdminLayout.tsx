import React, { ReactNode } from "react";

interface AdminLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AdminLayout({ sidebar, children }: AdminLayoutProps) {
  return (
    <div className="adminwrap">
      {sidebar}
      <main className="adminmain">{children}</main>
    </div>
  );
}