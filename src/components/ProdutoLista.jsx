import ProdutoCard from './ProdutoCard';

const ProdutoLista = ({ produtos }) => {
  return (
    <div className="lista-produtos">
      {produtos.map((produto) => (
        <ProdutoCard produto={produto} key={produto.id} />
      ))}
    </div>
  );
};

export default ProdutoLista;
