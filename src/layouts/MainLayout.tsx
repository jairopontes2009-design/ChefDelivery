import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  title: string;
  children: ReactNode;
};

const menu = [
  { nome: "Dashboard", rota: "/" },
  { nome: "Produtos", rota: "/produtos" },
  { nome: "Categorias", rota: "/categorias" },
  { nome: "Cardápio", rota: "/cardapio" },
  { nome: "Clientes", rota: "/clientes" },
];

export default function MainLayout({ title, children }: Props) {
  const location = useLocation();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
      <aside
        style={{
          width: 240,
          background: "#111827",
          color: "#fff",
          padding: 24,
        }}
      >
        <h2 style={{ marginBottom: 30 }}>🍽 ChefDelivery</h2>

        {menu.map((item) => (
          <Link
            key={item.rota}
            to={item.rota}
            style={{
              display: "block",
              padding: "12px 16px",
              marginBottom: 8,
              borderRadius: 8,
              textDecoration: "none",
              color: "#fff",
              background:
                location.pathname === item.rota ? "#2563eb" : "transparent",
            }}
          >
            {item.nome}
          </Link>
        ))}
      </aside>

      <main style={{ flex: 1 }}>
        <header
          style={{
            background: "#fff",
            padding: 20,
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>{title}</h1>

          <div>
            <strong>CPA Steak Grill</strong>
          </div>
        </header>

        <div style={{ padding: 24 }}>{children}</div>
      </main>
    </div>
  );
}