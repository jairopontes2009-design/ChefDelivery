import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Table({ children }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        {children}
      </table>
    </div>
  );
}