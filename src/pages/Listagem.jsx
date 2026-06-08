const formatarPreco = (valor) => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const Listagem = ({ produtos, carregando, erroApi }) => {
  return (
    <div className="card">
      <h1>Listagem de Produtos</h1>
      <p>Visualizacao dos produtos carregados da API e cadastrados no estoque.</p>

      {carregando && (
        <p className="mensagem-info">Carregando produtos da API...</p>
      )}

      {erroApi && (
        <p className="mensagem-erro">Erro na API: {erroApi}</p>
      )}

      {!carregando && produtos.length === 0 && (
        <p className="mensagem-info">Nenhum produto encontrado.</p>
      )}

      {produtos.length > 0 && (
        <div className="lista-produtos">
          {produtos.map((produto) => (
            <article className="produto-card" key={produto.id}>
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
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listagem;
