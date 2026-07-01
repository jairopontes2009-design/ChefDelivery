import { useState } from "react";
import "./App.css";

type Produto = {
  nome: string;
  categoria: string;
  preco: string;
};

function App() {
  const [logado, setLogado] = useState(false);
  const [pagina, setPagina] = useState("dashboard");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [categoriaProduto, setCategoriaProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    if (usuario === "admin" && senha === "1234") setLogado(true);
    else alert("Usuário ou senha inválidos");
  }

  function adicionarProduto() {
    if (!nomeProduto || !precoProduto) {
      alert("Preencha o nome e o preço.");
      return;
    }

    setProdutos([
      ...produtos,
      {
        nome: nomeProduto,
        categoria: categoriaProduto,
        preco: precoProduto,
      },
    ]);

    setNomeProduto("");
    setCategoriaProduto("");
    setPrecoProduto("");
  }

  if (!logado) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={entrar}>
          <div className="logo">CD</div>
          <h1>ChefDelivery</h1>
          <p>CPA Steak Grill</p>

          <input
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>
          <small>Usuário: admin | Senha: 1234</small>
        </form>
      </div>
    );
  }

  return (
    <div className="app">
      <aside>
        <h2>ChefDelivery</h2>
        <p>CPA Steak Grill</p>

        <button onClick={() => setPagina("dashboard")}>Dashboard</button>
        <button onClick={() => setPagina("produtos")}>Produtos</button>
        <button onClick={() => setPagina("clientes")}>Clientes</button>
        <button onClick={() => setPagina("cardapio")}>Cardápio Digital</button>
      </aside>

      <main>
        <header>
          <h1>
            {pagina === "dashboard"
              ? "Dashboard"
              : pagina === "produtos"
              ? "Produtos"
              : pagina === "clientes"
              ? "Clientes"
              : "Cardápio Digital"}
          </h1>

          <button onClick={() => setLogado(false)}>Sair</button>
        </header>

        {pagina === "dashboard" && (
          <section className="cards">
            <div>
              <span>Faturamento hoje</span>
              <strong>R$ 0,00</strong>
            </div>
            <div>
              <span>Pedidos</span>
              <strong>0</strong>
            </div>
            <div>
              <span>Produtos</span>
              <strong>{produtos.length}</strong>
            </div>
            <div>
              <span>Clientes</span>
              <strong>0</strong>
            </div>
          </section>
        )}

        {pagina === "produtos" && (
          <section className="form-box">
            <h2>Cadastro de Produtos</h2>

            <input
              placeholder="Nome do produto"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
            />

            <input
              placeholder="Categoria"
              value={categoriaProduto}
              onChange={(e) => setCategoriaProduto(e.target.value)}
            />

            <input
              placeholder="Preço"
              value={precoProduto}
              onChange={(e) => setPrecoProduto(e.target.value)}
            />

            <button onClick={adicionarProduto}>Salvar Produto</button>

            <hr style={{ margin: "20px 0", borderColor: "#292d38" }} />

            <h3>Produtos cadastrados</h3>

            {produtos.length === 0 ? (
              <p>Nenhum produto cadastrado.</p>
            ) : (
              produtos.map((produto, index) => (
                <div
                  key={index}
                  style={{
                    background: "#1b1f29",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <strong>{produto.nome}</strong>
                  <br />
                  Categoria: {produto.categoria || "-"}
                  <br />
                  Preço: R$ {produto.preco}
                </div>
              ))
            )}
          </section>
        )}

        {pagina === "clientes" && (
          <section className="form-box">
            <h2>Cadastro de Clientes</h2>
            <input placeholder="Nome" />
            <input placeholder="Telefone" />
            <input placeholder="Endereço" />
            <button>Salvar Cliente</button>
          </section>
        )}

        {pagina === "cardapio" && (
          <section className="form-box">
            <h2>Cardápio Digital</h2>
            <p>Os produtos cadastrados aparecerão aqui futuramente.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;