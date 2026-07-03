import { useEffect, useState } from "react";
import API_URL from "../services/api";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Input from "../components/Input";
import ProdutoCard from "../components/produtos/ProdutoCard";
import ProdutoFiltro from "../components/produtos/ProdutoFiltro";

type Produto = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  imagem?: string | null;
};

type Categoria = {
  id: number;
  nome: string;
};

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [pesquisa, setPesquisa] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [disponivel, setDisponivel] = useState(true);
  const [imagem, setImagem] = useState<string | null>(null);
  const [arquivoImagem, setArquivoImagem] = useState<File | null>(null);

  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  async function carregarProdutos() {
    const resposta = await fetch(`${API_URL}/produtos`);
    const dados = await resposta.json();
    setProdutos(dados);
  }

  async function carregarCategorias() {
    const resposta = await fetch(`${API_URL}/categorias`);
    const dados = await resposta.json();
    setCategorias(dados);
  }

  function limparFormulario() {
    setEditandoId(null);
    setNome("");
    setCategoria("");
    setDescricao("");
    setPreco("");
    setDisponivel(true);
    setImagem(null);
    setArquivoImagem(null);
  }

  function abrirNovoProduto() {
    limparFormulario();
    setModalAberto(true);
  }

  function editar(produto: Produto) {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setCategoria(produto.categoria);
    setDescricao(produto.descricao || "");
    setPreco(String(produto.preco).replace(".", ","));
    setDisponivel(produto.disponivel);
    setImagem(produto.imagem || null);
    setArquivoImagem(null);
    setModalAberto(true);
  }

  function duplicarProduto(produto: Produto) {
    setEditandoId(null);
    setNome(`${produto.nome} - Cópia`);
    setCategoria(produto.categoria);
    setDescricao(produto.descricao || "");
    setPreco(String(produto.preco).replace(".", ","));
    setDisponivel(produto.disponivel);
    setImagem(produto.imagem || null);
    setArquivoImagem(null);
    setModalAberto(true);
  }

  function selecionarImagem(file: File | null) {
    setArquivoImagem(file);
    if (file) setImagem(URL.createObjectURL(file));
  }

  function imagemUrl(caminho?: string | null) {
    if (!caminho) return "";
    if (caminho.startsWith("blob:")) return caminho;
    return `${API_URL}${caminho}`;
  }

  async function enviarImagem() {
    if (!arquivoImagem) return imagem;

    const formData = new FormData();
    formData.append("file", arquivoImagem);

    const resposta = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const dados = await resposta.json();
    return dados.imagem;
  }

  async function salvarProduto() {
    if (!nome || !categoria || !preco) {
      alert("Preencha nome, categoria e preço.");
      return;
    }

    const caminhoImagem = await enviarImagem();

    const dados = {
      nome,
      categoria,
      descricao,
      preco: Number(preco.replace(",", ".")),
      disponivel,
      imagem: caminhoImagem,
    };

    if (editandoId) {
      await fetch(`${API_URL}/produtos/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    } else {
      await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    }

    setModalAberto(false);
    limparFormulario();
    carregarProdutos();
  }

  async function excluirProduto(id: number) {
    if (!confirm("Deseja excluir este produto?")) return;

    await fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE",
    });

    carregarProdutos();
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const buscaNome = produto.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

    const buscaCategoria = filtroCategoria
      ? produto.categoria === filtroCategoria
      : true;

    return buscaNome && buscaCategoria;
  });

  return (
    <MainLayout title="Produtos">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2>🍝 Produtos</h2>
          <p style={{ color: "#6b7280" }}>Gerencie os produtos do cardápio.</p>
        </div>

        <Button onClick={abrirNovoProduto}>+ Novo Produto</Button>
      </div>

      <Card>
        <ProdutoFiltro
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          categoria={filtroCategoria}
          setCategoria={setFiltroCategoria}
          categorias={categorias}
        />
      </Card>

      <div style={{ marginTop: 24 }}>
        {produtosFiltrados.length === 0 ? (
          <Card>
            <p>Nenhum produto encontrado.</p>
          </Card>
        ) : (
          produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onEditar={() => editar(produto)}
              onDuplicar={() => duplicarProduto(produto)}
              onExcluir={() => excluirProduto(produto.id)}
            />
          ))
        )}
      </div>

      <Modal
        open={modalAberto}
        title={editandoId ? "Editar Produto" : "Novo Produto"}
        onClose={() => setModalAberto(false)}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <Input placeholder="Nome do produto" value={nome} onChange={setNome} />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nome}>
                {cat.nome}
              </option>
            ))}
          </select>

          <Input placeholder="Preço" value={preco} onChange={setPreco} />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d1d5db",
              minHeight: 90,
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => selecionarImagem(e.target.files?.[0] || null)}
          />

          {imagem && (
            <img
              src={imagemUrl(imagem)}
              alt="Prévia"
              style={{
                width: 180,
                height: 120,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          )}

          <label>
            <input
              type="checkbox"
              checked={disponivel}
              onChange={(e) => setDisponivel(e.target.checked)}
            />{" "}
            Produto disponível
          </label>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>

            <Button onClick={salvarProduto}>
              {editandoId ? "Atualizar Produto" : "Salvar Produto"}
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}