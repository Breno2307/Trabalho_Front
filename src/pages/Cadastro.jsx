import { useState } from 'react';
import { useProdutos } from '../hooks/useProdutos';

const Cadastro = () => {
  const { cadastrarProduto } = useProdutos();
  const produtoInicial = {
    nome: '',
    quantidade: '',
    preco: '',
    imagem: ''
  };

  const [produto, setProduto] = useState(produtoInicial);
  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const validarProduto = (dadosProduto) => {
    const novosErros = {};
    const quantidade = Number(dadosProduto.quantidade);
    const preco = Number(dadosProduto.preco);
    const imagem = dadosProduto.imagem.trim();

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

    if (imagem) {
      try {
        new URL(imagem);
      } catch {
        novosErros.imagem = 'Informe uma URL de imagem valida.';
      }
    }

    return novosErros;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduto((produtoAtual) => ({
      ...produtoAtual,
      [name]: value
    }));

    if (erros[name] || erros.api) {
      setErros((errosAtuais) => ({
        ...errosAtuais,
        [name]: '',
        api: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errosValidacao = validarProduto(produto);

    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      setMensagemSucesso('');
      return;
    }

    const mensagemErro = await cadastrarProduto(produto);

    if (mensagemErro) {
      setMensagemSucesso('');
      setErros({
        api: mensagemErro
      });
      return;
    }

    setMensagemSucesso('Produto cadastrado com sucesso!');
    setErros({});
    setProduto(produtoInicial);
  };

  return (
    <section className="page-section form-page">
      <div className="page-heading">
        <span className="eyebrow">Novo item</span>
        <h1>Cadastro de Produtos</h1>
        <p>Preencha os dados para adicionar um produto ao estoque.</p>
      </div>

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
          <label htmlFor="preco">Preco</label>

          <input
            id="preco"
            type="number"
            step="0.01"
            name="preco"
            placeholder="Digite o preco"
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

        <div className="campo campo-largo">
          <label htmlFor="imagem">Imagem do Produto</label>

          <input
            id="imagem"
            type="url"
            name="imagem"
            placeholder="Cole a URL da imagem"
            value={produto.imagem}
            onChange={handleChange}
            onBlur={handleBlur}
            className={erros.imagem ? 'campo-erro' : ''}
            aria-invalid={erros.imagem ? 'true' : 'false'}
            aria-describedby={erros.imagem ? 'erro-imagem' : undefined}
          />

          {erros.imagem && (
            <span className="mensagem-erro" id="erro-imagem">
              {erros.imagem}
            </span>
          )}

          {produto.imagem && !erros.imagem && (
            <img
              src={produto.imagem}
              alt="Previa do produto"
              className="preview-imagem"
            />
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">
            Cadastrar Produto
          </button>

          {mensagemSucesso && (
            <p className="mensagem-sucesso">
              {mensagemSucesso}
            </p>
          )}

          {erros.api && (
            <p className="mensagem-erro">
              {erros.api}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default Cadastro;
