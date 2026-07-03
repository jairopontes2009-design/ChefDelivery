import API_URL from "./api";

export async function listarCategorias() {
  const resposta = await fetch(`${API_URL}/categorias`);
  return resposta.json();
}