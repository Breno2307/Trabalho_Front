import { useProdutos } from '../hooks/useProdutos';

const Inicio = () => {
  const { produtos } = useProdutos();

  return (
    <div className="card">
      <h1>StockFlow</h1>
      <p>Sistema de controle de estoque com cadastro, listagem e dados de API REST.</p>

      <div className="resumo-estoque">
        <span>Total de produtos</span>
        <strong>{produtos.length}</strong>
      </div>
    </div>
  );
};

export default Inicio;
