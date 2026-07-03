import API_URL from "./api";

export async function listarProdutos() {
  const resposta = await fetch(`${API_URL}/produtos`);
  return resposta.json();
}

export async function salvarProduto(dados: any) {
  const resposta = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return resposta.json();
}

export async function atualizarProduto(id: number, dados: any) {
  const resposta = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return resposta.json();
}

export async function excluirProduto(id: number) {
  return fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
  });
}

export async function uploadImagem(arquivo: File) {
  const formData = new FormData();
  formData.append("file", arquivo);

  const resposta = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return resposta.json();
}