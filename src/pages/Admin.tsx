import { Link } from "react-router-dom";

export default function Admin() {
  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 16,
    padding: 24,
    textDecoration: "none",
    color: "#222",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    transition: "0.2s",
    display: "block",
  };

  return (
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
        padding: 30,
      }}
    >
      <h1 style={{ marginBottom: 10 }}>🍽️ ChefDelivery PRO</h1>

      <h2>CPA Steak Grill</h2>

      <p style={{ color: "#666", marginBottom: 35 }}>
        Painel Administrativo
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 20,
        }}
      >
        <Link to="/produtos" style={cardStyle}>
          <h2>🍝 Produtos</h2>
          <p>Gerencie todos os pratos.</p>
        </Link>

        <Link to="/clientes" style={cardStyle}>
          <h2>👥 Clientes</h2>
          <p>Cadastro de clientes.</p>
        </Link>

        <Link to="/cardapio" style={cardStyle}>
          <h2>📱 Cardápio</h2>
          <p>Visualizar Cardápio Digital.</p>
        </Link>

        <Link to="/" style={cardStyle}>
          <h2>📊 Dashboard</h2>
          <p>Indicadores do restaurante.</p>
        </Link>
      </div>
    </div>
  );
}