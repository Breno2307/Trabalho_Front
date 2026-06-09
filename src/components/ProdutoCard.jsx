const formatarPreco = (valor) => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const ProdutoCard = ({ produto, onRemoverProduto }) => {
  return (
    <article className="produto-card">
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
        onClick={() => onRemoverProduto(produto)}
      >
        Remover Produto
      </button>
    </article>
  );
};

export default ProdutoCard;
