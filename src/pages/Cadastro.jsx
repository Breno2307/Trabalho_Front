import { useState } from 'react';

const Cadastro = () => {

  const [produto, setProduto] = useState({
    nome: '',
    quantidade: '',
    preco: ''
  });

  // Captura os dados digitados
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduto({
      ...produto,
      [name]: value
    });
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(produto);

    alert('Produto cadastrado com sucesso!');

    // Limpar formulário
    setProduto({
      nome: '',
      quantidade: '',
      preco: ''
    });
  };

  return (
    <div className="card">

      <h1>Cadastro de Produtos</h1>

      <p>Preencha os dados do produto abaixo:</p>

      <form onSubmit={handleSubmit} className="formulario">

        <div className="campo">
          <label>Nome do Produto</label>

          <input
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Quantidade</label>

          <input
            type="number"
            name="quantidade"
            placeholder="Digite a quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label>Preço</label>

          <input
            type="number"
            step="0.01"
            name="preco"
            placeholder="Digite o preço"
            value={produto.preco}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">
          Cadastrar Produto
        </button>

      </form>
    </div>
  );
};

export default Cadastro;