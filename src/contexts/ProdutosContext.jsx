import { useEffect, useState } from 'react';
import { ProdutosContext } from './ProdutosContextBase';

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroApi, setErroApi] = useState('');

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const resposta = await fetch('https://fakestoreapi.com/products?limit=5');

        if (!resposta.ok) {
          throw new Error('Nao foi possivel carregar os produtos da API.');
        }

        const dados = await resposta.json();
        const produtosApi = dados.map((produto) => ({
          id: produto.id,
          nome: produto.title,
          quantidade: 1,
          preco: Number(produto.price),
          origem: 'API'
        }));

        setProdutos(produtosApi);
      } catch (error) {
        setErroApi(error.message);
      } finally {
        setCarregandoProdutos(false);
      }
    };

    carregarProdutos();
  }, []);

  const cadastrarProduto = (produto) => {
    const novoProduto = {
      id: Date.now(),
      nome: produto.nome.trim(),
      quantidade: Number(produto.quantidade),
      preco: Number(produto.preco),
      origem: 'Cadastro'
    };

    setProdutos((produtosAtuais) => [novoProduto, ...produtosAtuais]);
  };

  return (
    <ProdutosContext.Provider
      value={{
        produtos,
        carregandoProdutos,
        erroApi,
        cadastrarProduto
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
};
