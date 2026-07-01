import { useState } from "react";

type Produto = {
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
};

type ItemCarrinho = Produto & {
  quantidade: number;
};

const produtos: Produto[] = [
  {
    nome: "Jantinha com 2 Espetos",
    categoria: "Jantinhas",
    preco: 29.9,
    descricao: "Arroz, acompanhamentos e 2 espetos à escolha.",
  },
  {
    nome: "Mc'and Cheese Bacon e Calabresa",
    categoria: "Massas",
    preco: 29.9,
    descricao: "Macarrão cremoso com bacon e calabresa em cubinhos.",
  },
  {
    nome: "Mc'and Cheese Frango",
    categoria: "Massas",
    preco: 29.9,
    descricao: "Macarrão cremoso com frango desfiado.",
  },
  {
    nome: "Espaguete à Bolonhesa",
    categoria: "Massas",
    preco: 29.9,
    descricao: "Espaguete com molho à bolonhesa e cheiro-verde.",
  },
  {
    nome: "Caldo de Kenga",
    categoria: "Caldos",
    preco: 18,
    descricao: "Caldo cremoso com frango desfiado, bacon e calabresa.",
  },
  {
    nome: "Vaca Atolada",
    categoria: "Caldos",
    preco: 20,
    descricao: "Caldo tradicional com mandioca e carne.",
  },
  {
    nome: "Coca-Cola 310ml",
    categoria: "Bebidas",
    preco: 7,
    descricao: "Lata 310ml gelada.",
  },
  {
    nome: "Água Mineral",
    categoria: "Bebidas",
    preco: 5,
    descricao: "Água mineral sem gás.",
  },
  {
    nome: "Açaí 300ml",
    categoria: "Açaí",
    preco: 15,
    descricao: "Açaí cremoso no copo de 300ml.",
  },
];

export default function Cardapio() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoPedido, setTipoPedido] = useState("Retirada");
  const [endereco, setEndereco] = useState("");
  const [observacao, setObservacao] = useState("");

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  function adicionar(produto: Produto) {
    const existe = carrinho.find((item) => item.nome === produto.nome);

    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item.nome === produto.nome
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  }

  function diminuir(nome: string) {
    setCarrinho(
      carrinho
        .map((item) =>
          item.nome === nome
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function remover(nome: string) {
    setCarrinho(carrinho.filter((item) => item.nome !== nome));
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
          `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade)
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

      {["Jantinhas", "Massas", "Caldos", "Bebidas", "Açaí"].map((categoria) => (
        <section key={categoria}>
          <h2>{categoria}</h2>

          {produtos
            .filter((produto) => produto.categoria === categoria)
            .map((produto) => (
              <div className="produto-card" key={produto.nome}>
                <div>
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
            <div className="carrinho-item" key={item.nome}>
              <span>
                {item.quantidade}x {item.nome}
              </span>

              <div>
                <button onClick={() => diminuir(item.nome)}>-</button>
                <button onClick={() => adicionar(item)}>+</button>
                <button onClick={() => remover(item.nome)}>Remover</button>
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