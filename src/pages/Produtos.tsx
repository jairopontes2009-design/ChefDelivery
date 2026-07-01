export default function Dashboard() {
  return (
    <div style={{ padding: 30 }}>
      <h1>📊 Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginTop: 30,
        }}
      >
        <Card titulo="Faturamento Hoje" valor="R$ 0,00" />
        <Card titulo="Pedidos" valor="0" />
        <Card titulo="Produtos" valor="0" />
        <Card titulo="Clientes" valor="0" />
      </div>
    </div>
  );
}

function Card({ titulo, valor }: any) {
  return (
    <div
      style={{
        background: "#1b1f29",
        padding: 20,
        borderRadius: 16,
      }}
    >
      <p>{titulo}</p>

      <h2>{valor}</h2>
    </div>
  );
}