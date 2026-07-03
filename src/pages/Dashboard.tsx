import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <Card titulo="💰 Faturamento" valor="R$ 0,00" />
        <Card titulo="📦 Pedidos" valor="0" />
        <Card titulo="🍝 Produtos" valor="0" />
        <Card titulo="👥 Clientes" valor="0" />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 25,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <h2>Bem-vindo ao ChefDelivery PRO 🚀</h2>

        <p style={{ marginTop: 10 }}>
          O sistema está pronto para receber os próximos módulos.
        </p>

        <br />

        <ul>
          <li>✅ Produtos</li>
          <li>✅ Categorias</li>
          <li>✅ Upload de Fotos</li>
          <li>✅ Cardápio Digital</li>
          <li>✅ Complementos</li>
        </ul>
      </div>
    </MainLayout>
  );
}

type CardProps = {
  titulo: string;
  valor: string;
};

function Card({ titulo, valor }: CardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <p
        style={{
          color: "#6b7280",
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {titulo}
      </p>

      <h2>{valor}</h2>
    </div>
  );
}