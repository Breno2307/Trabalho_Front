import { useState } from 'react';

const Cadastro = ({ onCadastrarProduto }) => {
  const produtoInicial = {
    nome: '',
    quantidade: '',
    preco: ''
  };

  const [produto, setProduto] = useState(produtoInicial);
  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const validarProduto = (dadosProduto) => {
    const novosErros = {};
    const quantidade = Number(dadosProduto.quantidade);
    const preco = Number(dadosProduto.preco);

    if (!dadosProduto.nome.trim()) {
      novosErros.nome = 'Informe o nome do produto.';
    }

    if (dadosProduto.quantidade === '') {
      novosErros.quantidade = 'Informe a quantidade em estoque.';
    } else if (!Number.isInteger(quantidade) || quantidade <= 0) {
      novosErros.quantidade = 'A quantidade deve ser um numero inteiro maior que zero.';
    }

    if (dadosProduto.preco === '') {
      novosErros.preco = 'Informe o preco do produto.';
    } else if (preco <= 0) {
      novosErros.preco = 'O preco deve ser maior que zero.';
    }

    return novosErros;
  };

  // Captura os dados digitados
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduto((produtoAtual) => ({
      ...produtoAtual,
      [name]: value
    }));

    if (erros[name]) {
      setErros((errosAtuais) => ({
        ...errosAtuais,
        [name]: ''
      }));
    }

    setMensagemSucesso('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errosAtualizados = validarProduto({
      ...produto,
      [name]: value
    });

    setErros((errosAtuais) => ({
      ...errosAtuais,
      [name]: errosAtualizados[name] || ''
    }));
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const errosValidacao = validarProduto(produto);

    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      setMensagemSucesso('');
      return;
    }

    onCadastrarProduto(produto);

    setMensagemSucesso('Produto cadastrado com sucesso!');
    setErros({});

    // Limpar formulário
    setProduto(produtoInicial);
  };

  return (
    <div className="card">

      <h1>Cadastro de Produtos</h1>

      <p>Preencha os dados do produto abaixo:</p>

      <form onSubmit={handleSubmit} className="formulario" noValidate>

        <div className="campo">
          <label htmlFor="nome">Nome do Produto</label>

          <input
            id="nome"
            type="text"
            name="nome"
            placeholder="Digite o nome"
            value={produto.nome}
            onChange={handleChange}
            onBlur={handleBlur}
            className={erros.nome ? 'campo-erro' : ''}
            aria-invalid={erros.nome ? 'true' : 'false'}
            aria-describedby={erros.nome ? 'erro-nome' : undefined}
          />

          {erros.nome && (
            <span className="mensagem-erro" id="erro-nome">
              {erros.nome}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="quantidade">Quantidade</label>

          <input
            id="quantidade"
            type="number"
            name="quantidade"
            placeholder="Digite a quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            onBlur={handleBlur}
            min="1"
            step="1"
            className={erros.quantidade ? 'campo-erro' : ''}
            aria-invalid={erros.quantidade ? 'true' : 'false'}
            aria-describedby={erros.quantidade ? 'erro-quantidade' : undefined}
          />

          {erros.quantidade && (
            <span className="mensagem-erro" id="erro-quantidade">
              {erros.quantidade}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="preco">Preço</label>

          <input
            id="preco"
            type="number"
            step="0.01"
            name="preco"
            placeholder="Digite o preço"
            value={produto.preco}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0.01"
            className={erros.preco ? 'campo-erro' : ''}
            aria-invalid={erros.preco ? 'true' : 'false'}
            aria-describedby={erros.preco ? 'erro-preco' : undefined}
          />

          {erros.preco && (
            <span className="mensagem-erro" id="erro-preco">
              {erros.preco}
            </span>
          )}
        </div>

        <button type="submit" className="btn">
          Cadastrar Produto
        </button>

        {mensagemSucesso && (
          <p className="mensagem-sucesso">
            {mensagemSucesso}
          </p>
        )}

      </form>
    </div>
  );
};

export default Cadastro;
