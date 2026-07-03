import Badge from "../Badge";
import Button from "../Button";
import API_URL from "../../services/api";

type Produto = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  imagem?: string | null;
};

type Props = {
  produto: Produto;
  onEditar: () => void;
  onDuplicar: () => void;
  onExcluir: () => void;
};

export default function ProdutoCard({
  produto,
  onEditar,
  onDuplicar,
  onExcluir,
}: Props) {
  const imagem = produto.imagem
    ? `${API_URL}${produto.imagem}`
    : "";

  return (
    <div
      style={{
        display: "flex",
        background: "#fff",
        borderRadius: 12,
        padding: 18,
        marginBottom: 18,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        gap: 20,
        alignItems: "center",
      }}
    >
      {produto.imagem ? (
        <img
          src={imagem}
          alt={produto.nome}
          style={{
            width: 120,
            height: 90,
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 90,
            borderRadius: 10,
            background: "#ececec",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Sem Foto
        </div>
      )}

      <div style={{ flex: 1 }}>
        <h3>{produto.nome}</h3>

        <p>{produto.categoria}</p>

        <p>{produto.descricao}</p>

        <h2>
          R$ {produto.preco.toFixed(2).replace(".", ",")}
        </h2>

        <Badge ativo={produto.disponivel} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Button onClick={onEditar}>
          ✏ Editar
        </Button>

        <Button variant="secondary" onClick={onDuplicar}>
          📄 Duplicar
        </Button>

        <Button variant="danger" onClick={onExcluir}>
          🗑 Excluir
        </Button>
      </div>
    </div>
  );
}