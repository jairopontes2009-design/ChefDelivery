type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: Props) {
  const colors = {
    primary: "#2563eb",
    secondary: "#6b7280",
    danger: "#dc2626",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: colors[variant],
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 600,
        transition: "0.2s",
      }}
    >
      {children}
    </button>
  );
}