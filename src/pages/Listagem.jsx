import { useState } from 'react';
import ProdutoLista from '../components/ProdutoLista';
import { useProdutos } from '../hooks/useProdutos';

const Listagem = () => {
  const {
    produtos,
    carregandoProdutos,
    erroApi,
    carregarProdutos,
    removerProduto
  } = useProdutos();
  const [mensagemAcao, setMensagemAcao] = useState('');
  const [erroAcao, setErroAcao] = useState('');

  const handleRemoverProduto = async (produto) => {
    const mensagemErro = await removerProduto(produto.id);

    if (mensagemErro) {
      setErroAcao(mensagemErro);
      setMensagemAcao('');
      return;
    }

    setErroAcao('');
    setMensagemAcao(`Produto "${produto.nome}" removido com sucesso.`);
  };

  return (
    <div className="card">
      <h1>Listagem de Produtos</h1>
      <p>Visualizacao dos produtos carregados da API e cadastrados no estoque.</p>

      {carregandoProdutos && (
        <p className="mensagem-info">Carregando produtos da API...</p>
      )}

      {erroApi && (
        <div className="api-feedback">
          <p className="mensagem-erro">Erro na API: {erroApi}</p>

          <button
            type="button"
            className="btn btn-secundario"
            onClick={carregarProdutos}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!carregandoProdutos && produtos.length === 0 && (
        <p className="mensagem-info">Nenhum produto encontrado.</p>
      )}

      {mensagemAcao && (
        <p className="mensagem-sucesso">{mensagemAcao}</p>
      )}

      {erroAcao && (
        <p className="mensagem-erro">{erroAcao}</p>
      )}

      {produtos.length > 0 && (
        <ProdutoLista
          produtos={produtos}
          onRemoverProduto={handleRemoverProduto}
        />
      )}
    </div>
  );
};

export default Listagem;
