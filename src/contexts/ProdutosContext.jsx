import { useCallback, useEffect, useState } from 'react';
import {
  atualizarProdutoApi,
  buscarProdutosApi,
  criarProdutoApi,
  deletarProdutoApi
} from '../services/fakeStoreApi';
import { ProdutosContext } from './ProdutosContextBase';

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroApi, setErroApi] = useState('');

  const carregarProdutos = useCallback(async () => {
    try {
      setCarregandoProdutos(true);
      setErroApi('');

      const produtosApi = await buscarProdutosApi();
      setProdutos(produtosApi);
    } catch (error) {
      setErroApi(error.message);
    } finally {
      setCarregandoProdutos(false);
    }
  }, []);

  useEffect(() => {
    let componenteAtivo = true;

    const carregarProdutosIniciais = async () => {
      try {
        const produtosApi = await buscarProdutosApi();

        if (!componenteAtivo) {
          return;
        }

        setProdutos(produtosApi);
        setErroApi('');
      } catch (error) {
        if (componenteAtivo) {
          setErroApi(error.message);
        }
      } finally {
        if (componenteAtivo) {
          setCarregandoProdutos(false);
        }
      }
    };

    carregarProdutosIniciais();

    return () => {
      componenteAtivo = false;
    };
  }, []);

  const cadastrarProduto = async (produto) => {
    const produtoParaCadastro = {
      nome: produto.nome.trim(),
      quantidade: Number(produto.quantidade),
      preco: Number(produto.preco),
      imagem: produto.imagem.trim(),
      origem: 'Cadastro'
    };

    try {
      const produtoCriado = await criarProdutoApi(produtoParaCadastro);
      const novoProduto = {
        ...produtoParaCadastro,
        id: produtoCriado.id || Date.now()
      };

      setProdutos((produtosAtuais) => [novoProduto, ...produtosAtuais]);
      return '';
    } catch (error) {
      return error.message;
    }
  };

  const registrarSaidaProduto = async (produtoId, quantidadeSaida) => {
    const quantidade = Number(quantidadeSaida);
    const produtoSelecionado = produtos.find((produto) => produto.id === Number(produtoId));

    if (!produtoSelecionado) {
      return 'Selecione um produto para registrar a saida.';
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return 'Informe uma quantidade inteira maior que zero.';
    }

    if (quantidade > produtoSelecionado.quantidade) {
      return 'A quantidade de saida nao pode ser maior que o estoque atual.';
    }

    const produtoAtualizado = {
      ...produtoSelecionado,
      quantidade: produtoSelecionado.quantidade - quantidade
    };

    try {
      await atualizarProdutoApi(produtoAtualizado);
    } catch (error) {
      return error.message;
    }

    setProdutos((produtosAtuais) => (
      produtosAtuais.map((produto) => (
        produto.id === produtoSelecionado.id
          ? produtoAtualizado
          : produto
      ))
    ));

    setMovimentacoes((movimentacoesAtuais) => [
      {
        id: Date.now(),
        tipo: 'Saida',
        produtoId: produtoSelecionado.id,
        produtoNome: produtoSelecionado.nome,
        produtoAntes: produtoSelecionado,
        produtoDepois: produtoAtualizado,
        quantidade,
        data: new Date().toLocaleString('pt-BR'),
        desfeita: false
      },
      ...movimentacoesAtuais
    ]);

    return '';
  };

  const removerProduto = async (produtoId) => {
    const produtoSelecionado = produtos.find((produto) => produto.id === Number(produtoId));

    if (!produtoSelecionado) {
      return 'Produto nao encontrado para remocao.';
    }

    try {
      await deletarProdutoApi(produtoSelecionado.id);

      setProdutos((produtosAtuais) => (
        produtosAtuais.filter((produto) => produto.id !== produtoSelecionado.id)
      ));

      setMovimentacoes((movimentacoesAtuais) => [
        {
          id: Date.now(),
          tipo: 'Remocao',
          produtoId: produtoSelecionado.id,
          produtoNome: produtoSelecionado.nome,
          produtoAntes: produtoSelecionado,
          quantidade: produtoSelecionado.quantidade,
          data: new Date().toLocaleString('pt-BR'),
          desfeita: false
        },
        ...movimentacoesAtuais
      ]);

      return '';
    } catch (error) {
      return error.message;
    }
  };

  const desfazerMovimentacao = async (movimentacaoId) => {
    const movimentacao = movimentacoes.find((item) => item.id === movimentacaoId);

    if (!movimentacao) {
      return 'Movimentacao nao encontrada.';
    }

    if (movimentacao.desfeita) {
      return 'Essa movimentacao ja foi desfeita.';
    }

    if (movimentacao.tipo === 'Saida') {
      const produtoAtual = produtos.find((produto) => produto.id === movimentacao.produtoId);
      const produtoRestaurado = produtoAtual
        ? {
            ...produtoAtual,
            quantidade: produtoAtual.quantidade + movimentacao.quantidade
          }
        : movimentacao.produtoAntes;

      try {
        await atualizarProdutoApi(produtoRestaurado);
      } catch (error) {
        return error.message;
      }

      setProdutos((produtosAtuais) => {
        const produtoExiste = produtosAtuais.some((produto) => produto.id === produtoRestaurado.id);

        if (!produtoExiste) {
          return [produtoRestaurado, ...produtosAtuais];
        }

        return produtosAtuais.map((produto) => (
          produto.id === produtoRestaurado.id ? produtoRestaurado : produto
        ));
      });
    }

    if (movimentacao.tipo === 'Remocao') {
      try {
        await criarProdutoApi(movimentacao.produtoAntes);
      } catch (error) {
        return error.message;
      }

      setProdutos((produtosAtuais) => {
        const produtoExiste = produtosAtuais.some((produto) => produto.id === movimentacao.produtoAntes.id);

        if (produtoExiste) {
          return produtosAtuais;
        }

        return [movimentacao.produtoAntes, ...produtosAtuais];
      });
    }

    setMovimentacoes((movimentacoesAtuais) => (
      movimentacoesAtuais.map((item) => (
        item.id === movimentacaoId
          ? { ...item, desfeita: true }
          : item
      ))
    ));

    return '';
  };

  return (
    <ProdutosContext.Provider
      value={{
        produtos,
        carregandoProdutos,
        erroApi,
        cadastrarProduto,
        carregarProdutos,
        movimentacoes,
        registrarSaidaProduto,
        removerProduto,
        desfazerMovimentacao
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
};
