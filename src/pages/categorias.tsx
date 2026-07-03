import { useEffect, useState } from "react";
import API_URL from "../services/api";

type Categoria = {
  id: number;
  nome: string;
};

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  async function carregarCategorias() {
    const resposta = await fetch(`${API_URL}/categorias`);
    const dados = await resposta.json();
    setCategorias(dados);
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  function editar(categoria: Categoria) {
    setEditandoId(categoria.id);
    setNome(categoria.nome);
  }

  function limpar() {
    setEditandoId(null);
    setNome("");
  }

  async function salvarCategoria() {
    if (!nome.trim()) {
      alert("Digite o nome da categoria.");
      return;
    }

    const url = editandoId
      ? `${API_URL}/categorias/${editandoId}`
      : `${API_URL}/categorias`;

    const metodo = editandoId ? "PUT" : "POST";

    const resposta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });

    if (!resposta.ok) {
      alert("Erro ao salvar categoria.");
      return;
    }

    limpar();
    carregarCategorias();
  }

  async function excluirCategoria(id: number) {
    if (!confirm("Deseja excluir esta categoria?")) return;

    await fetch(`${API_URL}/categorias/${id}`, {
      method: "DELETE",
    });

    carregarCategorias();
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>📂 Categorias</h1>

      <div style={{ display: "grid", gap: 12, maxWidth: 500 }}>
        <input
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button onClick={salvarCategoria}>
          {editandoId ? "Atualizar Categoria" : "Salvar Categoria"}
        </button>

        {editandoId && (
          <button onClick={limpar}>Cancelar edição</button>
        )}
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Categorias cadastradas</h2>

      {categorias.map((categoria) => (
        <div
          key={categoria.id}
          style={{
            background: "#fff",
            color: "#111",
            padding: 18,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <strong>{categoria.nome}</strong>

          <br />
          <br />

          <button onClick={() => editar(categoria)}>✏️ Editar</button>{" "}
          <button onClick={() => excluirCategoria(categoria.id)}>
            🗑 Excluir
          </button>
        </div>
      ))}
    </div>
  );
}