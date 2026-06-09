import ProdutoCard from './ProdutoCard';

const ProdutoLista = ({ produtos, onRemoverProduto }) => {
  return (
    <div className="lista-produtos">
      {produtos.map((produto) => (
        <ProdutoCard
          produto={produto}
          onRemoverProduto={onRemoverProduto}
          key={produto.id}
        />
      ))}
    </div>
  );
};

export default ProdutoLista;
