import { useEffect, useState } from "react";
import API_URL from "../services/api";

type Produto = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  imagem?: string | null;
};

type ItemCarrinho = Produto & {
  quantidade: number;
};

export default function Cardapio() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoPedido, setTipoPedido] = useState("Retirada");
  const [endereco, setEndereco] = useState("");
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const resposta = await fetch(`${API_URL}/produtos`);
    const dados = await resposta.json();
    setProdutos(dados.filter((produto: Produto) => produto.disponivel));
  }

  function imagemUrl(caminho?: string | null) {
    if (!caminho) return "";
    return `${API_URL}${caminho}`;
  }

  const categorias = Array.from(new Set(produtos.map((p) => p.categoria)));

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  function adicionar(produto: Produto) {
    const existe = carrinho.find((item) => item.id === produto.id);

    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  }

  function diminuir(id: number) {
    setCarrinho(
      carrinho
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function remover(id: number) {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  }

  function finalizarPedido() {
    if (carrinho.length === 0) {
      alert("Adicione pelo menos um item ao carrinho.");
      return;
    }

    if (!nomeCliente) {
      alert("Informe seu nome.");
      return;
    }

    const itens = carrinho
      .map(
        (item) =>
          `${item.quantidade}x ${item.nome} - R$ ${(
            item.preco * item.quantidade
          )
            .toFixed(2)
            .replace(".", ",")}`
      )
      .join("%0A");

    const mensagem = `Olá! Quero fazer um pedido no CPA Steak Grill:%0A%0ACliente: ${nomeCliente}%0ATipo: ${tipoPedido}%0A${
      tipoPedido === "Delivery" ? `Endereço: ${endereco}%0A` : ""
    }%0AItens:%0A${itens}%0A%0ATotal: R$ ${total
      .toFixed(2)
      .replace(".", ",")}%0A%0AObservação: ${observacao || "Nenhuma"}`;

    window.open(`https://wa.me/5565993143400?text=${mensagem}`, "_blank");
  }

  return (
    <div className="cardapio-page">
      <header className="cardapio-header">
        <h1>🍽️ CPA Steak Grill</h1>
        <p>Cardápio Digital</p>
      </header>

      {categorias.length === 0 && <p>Nenhum produto disponível no momento.</p>}

      {categorias.map((categoria) => (
        <section key={categoria}>
          <h2>{categoria}</h2>

          {produtos
            .filter((produto) => produto.categoria === categoria)
            .map((produto) => (
              <div className="produto-card" key={produto.id}>
                {produto.imagem ? (
                  <img
                    src={imagemUrl(produto.imagem)}
                    alt={produto.nome}
                    style={{
                      width: 120,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 12,
                      marginRight: 16,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 120,
                      height: 90,
                      borderRadius: 12,
                      background: "#eee",
                      marginRight: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#777",
                    }}
                  >
                    Sem foto
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                  <strong>R$ {produto.preco.toFixed(2).replace(".", ",")}</strong>
                </div>

                <button onClick={() => adicionar(produto)}>Adicionar</button>
              </div>
            ))}
        </section>
      ))}

      <section className="carrinho">
        <h2>🛒 Carrinho</h2>

        {carrinho.length === 0 ? (
          <p>Nenhum item adicionado.</p>
        ) : (
          carrinho.map((item) => (
            <div className="carrinho-item" key={item.id}>
              <span>
                {item.quantidade}x {item.nome}
              </span>

              <div>
                <button onClick={() => diminuir(item.id)}>-</button>
                <button onClick={() => adicionar(item)}>+</button>
                <button onClick={() => remover(item.id)}>Remover</button>
              </div>
            </div>
          ))
        )}

        <h3>Total: R$ {total.toFixed(2).replace(".", ",")}</h3>

        <input
          placeholder="Seu nome"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
        />

        <select value={tipoPedido} onChange={(e) => setTipoPedido(e.target.value)}>
          <option>Retirada</option>
          <option>Delivery</option>
        </select>

        {tipoPedido === "Delivery" && (
          <input
            placeholder="Endereço para entrega"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        )}

        <textarea
          placeholder="Observações do pedido"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />

        <button className="whatsapp" onClick={finalizarPedido}>
          Finalizar pelo WhatsApp
        </button>
      </section>
    </div>
  );
}