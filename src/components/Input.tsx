type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

export default function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 14px",
        border: "1px solid #d1d5db",
        borderRadius: 8,
        fontSize: 15,
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  );
}