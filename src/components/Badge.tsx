type Props = {
  ativo: boolean;
};

export default function Badge({ ativo }: Props) {
  return (
    <span
      style={{
        background: ativo ? "#16a34a" : "#dc2626",
        color: "#fff",
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {ativo ? "Disponível" : "Indisponível"}
    </span>
  );
}