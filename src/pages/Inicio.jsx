import { useProdutos } from '../hooks/useProdutos';

const Inicio = () => {
  const { produtos } = useProdutos();
  const valorTotal = produtos.reduce((total, produto) => {
    return total + Number(produto.preco) * Number(produto.quantidade);
  }, 0);
  const produtosBaixoEstoque = produtos.filter((produto) => produto.quantidade <= 1).length;
  const produtosApi = produtos.filter((produto) => produto.origem === 'API').length;

  const valorFormatado = valorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return (
    <section className="page-section home-page">
      <div className="page-heading hero-heading">
        <div>
          <span className="eyebrow">Painel principal</span>
          <h1>StockFlow</h1>
          <p>Sistema de controle de estoque com cadastro, listagem e dados de API REST.</p>
        </div>
      </div>

      <div className="dashboard-grid" aria-label="Resumo do estoque">
        <article className="metric-card metric-card-primary">
          <span>Total de produtos</span>
          <strong>{produtos.length}</strong>
          <small>Itens disponiveis no controle</small>
        </article>

        <article className="metric-card">
          <span>Valor em estoque</span>
          <strong>{valorFormatado}</strong>
          <small>Soma de preco por quantidade</small>
        </article>

        <article className="metric-card">
          <span>Baixo estoque</span>
          <strong>{produtosBaixoEstoque}</strong>
          <small>Produtos com uma unidade ou menos</small>
        </article>

        <article className="metric-card">
          <span>Produtos da API</span>
          <strong>{produtosApi}</strong>
          <small>Carregados da Fake Store API</small>
        </article>
      </div>
    </section>
  );
};

export default Inicio;
