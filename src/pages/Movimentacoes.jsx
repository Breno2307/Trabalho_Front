import { useState } from 'react';
import { useProdutos } from '../hooks/useProdutos';

const Movimentacoes = () => {
  const {
    produtos,
    movimentacoes,
    registrarSaidaProduto,
    desfazerMovimentacao
  } = useProdutos();

  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [erro, setErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const produtosComEstoque = produtos.filter((produto) => produto.quantidade > 0);
  const totalRetirado = movimentacoes
    .filter((movimentacao) => movimentacao.tipo === 'Saida' && !movimentacao.desfeita)
    .reduce((total, movimentacao) => total + movimentacao.quantidade, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mensagemErro = await registrarSaidaProduto(produtoId, quantidade);

    if (mensagemErro) {
      setErro(mensagemErro);
      setMensagemSucesso('');
      return;
    }

    setErro('');
    setMensagemSucesso('Saida de produto registrada com sucesso!');
    setProdutoId('');
    setQuantidade('');
  };

  const handleDesfazer = async (movimentacaoId) => {
    const mensagemErro = await desfazerMovimentacao(movimentacaoId);

    if (mensagemErro) {
      setErro(mensagemErro);
      setMensagemSucesso('');
      return;
    }

    setErro('');
    setMensagemSucesso('Movimentacao desfeita com sucesso!');
  };

  return (
    <section className="page-section">
      <div className="page-heading page-heading-row">
        <div>
          <span className="eyebrow">Operacoes</span>
          <h1>Movimentacoes de Estoque</h1>
          <p>Registre saidas de produtos e acompanhe as retiradas do estoque.</p>
        </div>

        <div className="resumo-estoque">
          <span>Retiradas ativas</span>
          <strong>{totalRetirado}</strong>
        </div>
      </div>

      <form className="formulario movimentacao-form" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="produto">Produto</label>

          <select
            id="produto"
            name="produto"
            value={produtoId}
            onChange={(e) => {
              setProdutoId(e.target.value);
              setErro('');
              setMensagemSucesso('');
            }}
          >
            <option value="">Selecione um produto</option>

            {produtosComEstoque.map((produto) => (
              <option value={produto.id} key={produto.id}>
                {produto.nome} - estoque: {produto.quantidade}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="quantidade-saida">Quantidade de saida</label>

          <input
            id="quantidade-saida"
            type="number"
            min="1"
            step="1"
            value={quantidade}
            onChange={(e) => {
              setQuantidade(e.target.value);
              setErro('');
              setMensagemSucesso('');
            }}
            placeholder="Digite a quantidade retirada"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-alerta">
            Registrar Saida
          </button>

          {erro && (
            <p className="mensagem-erro">{erro}</p>
          )}

          {mensagemSucesso && (
            <p className="mensagem-sucesso">{mensagemSucesso}</p>
          )}
        </div>
      </form>

      <section className="historico-movimentacoes">
        <h2>Historico de Movimentacoes</h2>

        {movimentacoes.length === 0 ? (
          <p className="mensagem-info">Nenhuma movimentacao registrada ate o momento.</p>
        ) : (
          <div className="lista-movimentacoes">
            {movimentacoes.map((movimentacao) => (
              <article
                className={`movimentacao-item ${movimentacao.desfeita ? 'movimentacao-desfeita' : ''}`}
                key={movimentacao.id}
              >
                <div>
                  <strong>{movimentacao.tipo}</strong>
                  <p>{movimentacao.produtoNome}</p>
                </div>

                <span>{movimentacao.quantidade} unidade(s)</span>
                <small>{movimentacao.data}</small>

                <button
                  type="button"
                  className="btn btn-secundario"
                  onClick={() => handleDesfazer(movimentacao.id)}
                  disabled={movimentacao.desfeita}
                >
                  {movimentacao.desfeita ? 'Desfeita' : 'Desfazer'}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default Movimentacoes;
