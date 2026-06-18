# 📦 StockFlow - Sistema de Controle de Estoque

## 📖 Descrição

O **StockFlow** é uma aplicação web desenvolvida em **React** para gerenciamento de estoque. O sistema permite cadastrar produtos, visualizar itens disponíveis, registrar movimentações de saída e acompanhar alterações realizadas no estoque.

Além dos produtos cadastrados manualmente, o sistema integra dados da **Fake Store API**, possibilitando a visualização de produtos externos e a simulação de operações CRUD em uma API REST.

O projeto foi desenvolvido com fins acadêmicos para aplicação prática de conceitos de Front-End moderno, gerenciamento de estado global, roteamento de páginas e consumo de APIs.

---

# 🎯 Objetivos do Projeto

* Desenvolver uma aplicação SPA (Single Page Application) utilizando React.
* Aplicar conceitos de componentização.
* Utilizar Context API para compartilhamento de estado global.
* Consumir dados de uma API REST.
* Implementar validações em formulários.
* Simular operações de estoque.
* Registrar movimentações e permitir desfazer ações.

---

# 🚀 Funcionalidades

## 🏠 Página Inicial

A página inicial apresenta um painel com indicadores do estoque:

* Total de produtos cadastrados.
* Valor total do estoque.
* Produtos com baixo estoque.
* Quantidade de produtos carregados da API.

---

## 📝 Cadastro de Produtos

Permite adicionar novos produtos ao estoque.

### Validações implementadas

* Nome obrigatório.
* Nome limitado a 50 caracteres.
* Quantidade obrigatória.
* Quantidade deve ser maior que zero.
* Preço obrigatório.
* Preço deve ser maior que zero.
* URL da imagem validada.
* Exibição de pré-visualização da imagem.

### Dados cadastrados

* Nome do produto
* Quantidade
* Preço
* URL da imagem

---

## 📋 Listagem de Produtos

Exibe todos os produtos disponíveis no sistema.

Cada produto apresenta:

* Imagem
* Nome
* Quantidade
* Preço
* Categoria
* Origem do produto (API ou Cadastro)

Também permite:

* Remover produtos do estoque.
* Atualizar automaticamente a listagem após alterações.

---

## 🔄 Movimentações de Estoque

Permite registrar saídas de produtos.

### Recursos

* Seleção do produto.
* Registro da quantidade retirada.
* Atualização automática do estoque.
* Histórico completo de movimentações.
* Desfazer movimentações realizadas.

---

# 🌐 Integração com API

O sistema utiliza a Fake Store API para obter produtos externos.

### Operações utilizadas

| Método | Função            |
| ------ | ----------------- |
| GET    | Buscar produtos   |
| POST   | Criar produto     |
| PUT    | Atualizar produto |
| DELETE | Remover produto   |

API utilizada:

https://fakestoreapi.com

---

# 🛠 Tecnologias Utilizadas

## Front-End

* React
* React Router DOM
* JavaScript ES6+
* HTML5
* CSS3

## Gerenciamento de Estado

* Context API
* React Hooks

## Consumo de API

* Fetch API
* Async/Await

## Ferramentas

* Vite
* ESLint
* Git
* GitHub

---

# 📂 Estrutura do Projeto

```text
TRABALHO_FRONT/

├── public/

├── src/
│
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   ├── Navbar.jsx
│   ├── ProdutoCard.jsx
│   └── ProdutoLista.jsx
│
├── contexts/
│   ├── ProdutosContext.jsx
│   └── ProdutosContextBase.js
│
├── hooks/
│   └── useProdutos.js
│
├── pages/
│   ├── Inicio.jsx
│   ├── Cadastro.jsx
│   ├── Listagem.jsx
│   └── Movimentacoes.jsx
│
├── services/
│   └── fakeStoreApi.js
│
├── styles/
│   ├── feature09.css
│   └── global.css
│
├── App.jsx
├── index.css
└── main.jsx

├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧠 Conceitos Aplicados

Durante o desenvolvimento foram utilizados os seguintes conceitos:

* Componentização
* React Hooks
* useState
* useEffect
* useContext
* useCallback
* Context API
* React Router
* Consumo de APIs REST
* Manipulação de formulários
* Validação de dados
* Programação assíncrona
* Gerenciamento de estado global
* Organização de projetos React

---

# ▶️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/Breno2307/Trabalho_Front.git
```

## 2. Entrar na pasta

```bash
cd TRABALHO_FRONT
```

## 3. Instalar dependências

```bash
npm install
```

## 4. Executar o projeto

```bash
npm run dev
```

## 5. Abrir no navegador

```text
http://localhost:5173
```

---

# 📸 Fluxo de Utilização

1. Acessar a página inicial.
2. Visualizar os indicadores do estoque.
3. Cadastrar novos produtos.
4. Consultar a listagem de produtos.
5. Registrar movimentações de saída.
6. Consultar o histórico.
7. Desfazer movimentações quando necessário.

---

# 👨‍💻 Desenvolvedores

Projeto desenvolvido por:

* Breno Candido
* Cauã Mata

---

# 📚 Finalidade

Este projeto foi desenvolvido exclusivamente para fins acadêmicos e de aprendizagem, com o objetivo de praticar conceitos de desenvolvimento Front-End utilizando React.

---

# 📄 Licença

Uso acadêmico e educacional.
