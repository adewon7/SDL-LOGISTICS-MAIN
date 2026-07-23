import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  sub?: string;
  right?: ReactNode;
}

export function PageHeader({ title, sub, right }: PageHeaderProps) {
  return (
    <div className="row mb" style={{ alignItems: "flex-start" }}>
      <div className="grow">
        <h2 style={{ fontSize: 21 }}>{title}</h2>
        {sub && <p className="muted" style={{ marginTop: 3 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}