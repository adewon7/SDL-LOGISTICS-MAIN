import type { ReactNode } from "react";
import { Card } from "../../../components/ui/Card";
import styles from "./AdminTable.module.css";

interface AdminTableProps {
  cols: string[];
  rows: ReactNode;
}

export function AdminTable({ cols, rows }: AdminTableProps) {
  return (
    <Card style={{ padding: 0, overflowX: "auto" }}>
      <table className={styles.table}>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </Card>
  );
}