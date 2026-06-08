# StockFlow

Aplicacao web em React para controle de estoque, com navegacao entre paginas, cadastro validado, listagem dinamica e consumo de API REST.

## Funcionalidades

- Menu de navegacao com rotas para Inicio, Cadastro, Listagem e Movimentacoes.
- Formulario controlado para cadastro de produtos.
- Validacao de nome, quantidade e preco antes do envio.
- Estado compartilhado entre Cadastro e Listagem.
- Context API para centralizar produtos, carregamento da API e cadastro.
- Listagem dinamica de produtos cadastrados e produtos carregados de API REST.
- Estilizacao com CSS externo e responsividade basica.

## API REST

A aplicacao consome produtos da Fake Store API:

```txt
https://fakestoreapi.com/products?limit=5
```

## Como executar

```bash
npm install
npm run dev
```

Depois acesse o endereco exibido no terminal, normalmente:

```txt
http://localhost:5173
```

## Scripts

- `npm run dev`: inicia o servidor local.
- `npm run build`: gera a versao final da aplicacao.
- `npm run lint`: executa a verificacao de codigo.

## Estrutura

```txt
src/
  components/
    Navbar.jsx
    Navbar.css
  contexts/
    ProdutosContext.jsx
    ProdutosContextBase.js
  hooks/
    useProdutos.js
  pages/
    Cadastro.jsx
    Inicio.jsx
    Listagem.jsx
    Movimentacoes.jsx
  styles/
    global.css
  App.jsx
  main.jsx
```
