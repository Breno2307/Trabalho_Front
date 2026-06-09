const API_BASE_URL = 'https://fakestoreapi.com';

const normalizarProdutoApi = (produto) => ({
  id: produto.id,
  nome: produto.title,
  quantidade: 1,
  preco: Number(produto.price),
  categoria: produto.category,
  imagem: produto.image,
  origem: 'API'
});

const montarPayloadProduto = (produto) => ({
  title: produto.nome,
  price: Number(produto.preco),
  description: produto.descricao || 'Produto cadastrado pelo StockFlow',
  image: produto.imagem || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  category: produto.categoria || 'stock'
});

const validarResposta = async (resposta, mensagemErro) => {
  if (!resposta.ok) {
    throw new Error(mensagemErro);
  }

  return resposta.json();
};

export const buscarProdutosApi = async () => {
  const resposta = await fetch(`${API_BASE_URL}/products`);
  const dados = await validarResposta(
    resposta,
    'Nao foi possivel carregar os produtos da Fake Store API.'
  );

  if (!Array.isArray(dados)) {
    throw new Error('A resposta da API nao esta no formato esperado.');
  }

  return dados.map(normalizarProdutoApi);
};

export const criarProdutoApi = async (produto) => {
  const resposta = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(montarPayloadProduto(produto))
  });

  return validarResposta(resposta, 'Nao foi possivel cadastrar o produto na API.');
};

export const atualizarProdutoApi = async (produto) => {
  const resposta = await fetch(`${API_BASE_URL}/products/${produto.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(montarPayloadProduto(produto))
  });

  return validarResposta(resposta, 'Nao foi possivel atualizar o produto na API.');
};

export const deletarProdutoApi = async (produtoId) => {
  const resposta = await fetch(`${API_BASE_URL}/products/${produtoId}`, {
    method: 'DELETE'
  });

  return validarResposta(resposta, 'Nao foi possivel remover o produto da API.');
};
