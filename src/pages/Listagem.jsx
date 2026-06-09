import { useState } from 'react';
import { useProdutos } from '../hooks/useProdutos';

const formatarPreco = (valor) => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

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
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <article className="produto-card" key={produto.id}>
              {produto.imagem && (
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="produto-imagem"
                />
              )}

              <div className="produto-topo">
                <h2>{produto.nome}</h2>
                <span>{produto.origem}</span>
              </div>

              <div className="produto-detalhes">
                <p>
                  <strong>Quantidade:</strong> {produto.quantidade}
                </p>

                <p>
                  <strong>Preco:</strong> {formatarPreco(produto.preco)}
                </p>

                {produto.categoria && (
                  <p>
                    <strong>Categoria:</strong> {produto.categoria}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="btn btn-alerta"
                onClick={() => handleRemoverProduto(produto)}
              >
                Remover Produto
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listagem;
