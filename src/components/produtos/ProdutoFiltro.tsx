import Input from "../Input";

type Categoria = {
  id: number;
  nome: string;
};

type Props = {
  pesquisa: string;
  setPesquisa: (v: string) => void;
  categoria: string;
  setCategoria: (v: string) => void;
  categorias: Categoria[];
};

export default function ProdutoFiltro({
  pesquisa,
  setPesquisa,
  categoria,
  setCategoria,
  categorias,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        marginBottom: 20,
      }}
    >
      <div style={{ flex: 1 }}>
        <Input
          placeholder="🔍 Pesquisar produto..."
          value={pesquisa}
          onChange={setPesquisa}
        />
      </div>

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        style={{
          width: 220,
          padding: 12,
          borderRadius: 8,
          border: "1px solid #d1d5db",
        }}
      >
        <option value="">Todas as categorias</option>

        {categorias.map((c) => (
          <option key={c.id} value={c.nome}>
            {c.nome}
          </option>
        ))}
      </select>
    </div>
  );
}