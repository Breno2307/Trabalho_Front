import ProdutoLista from '../components/ProdutoLista';
import { useProdutos } from '../hooks/useProdutos';

const Listagem = () => {
  const { produtos, carregandoProdutos, erroApi } = useProdutos();

  return (
    <div className="card">
      <h1>Listagem de Produtos</h1>
      <p>Visualizacao dos produtos carregados da API e cadastrados no estoque.</p>

      {carregandoProdutos && (
        <p className="mensagem-info">Carregando produtos da API...</p>
      )}

      {erroApi && (
        <p className="mensagem-erro">Erro na API: {erroApi}</p>
      )}

      {!carregandoProdutos && produtos.length === 0 && (
        <p className="mensagem-info">Nenhum produto encontrado.</p>
      )}

      {produtos.length > 0 && (
        <ProdutoLista produtos={produtos} />
      )}
    </div>
  );
};

export default Listagem;
