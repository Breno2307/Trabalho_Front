const formatarPreco = (valor) => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const ProdutoCard = ({ produto }) => {
  return (
    <article className="produto-card">
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
  );
};

export default ProdutoCard;
