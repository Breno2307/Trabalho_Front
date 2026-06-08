import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';
import Movimentacoes from './pages/Movimentacoes';

import Navbar from './components/Navbar';

import './styles/global.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroApi, setErroApi] = useState('');

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const resposta = await fetch('https://fakestoreapi.com/products?limit=5');

        if (!resposta.ok) {
          throw new Error('Nao foi possivel carregar os produtos da API.');
        }

        const dados = await resposta.json();
        const produtosApi = dados.map((produto) => ({
          id: produto.id,
          nome: produto.title,
          quantidade: 1,
          preco: Number(produto.price),
          origem: 'API'
        }));

        setProdutos(produtosApi);
      } catch (error) {
        setErroApi(error.message);
      } finally {
        setCarregandoProdutos(false);
      }
    };

    carregarProdutos();
  }, []);

  const cadastrarProduto = (produto) => {
    const novoProduto = {
      id: Date.now(),
      nome: produto.nome.trim(),
      quantidade: Number(produto.quantidade),
      preco: Number(produto.preco),
      origem: 'Cadastro'
    };

    setProdutos((produtosAtuais) => [novoProduto, ...produtosAtuais]);
  };

  return (
    <Router>
      <div className="App">
        <div className="container">

          <Navbar />

          <Routes>
            <Route
              path="/"
              element={<Inicio totalProdutos={produtos.length} />}
            />

            <Route
              path="/cadastro"
              element={<Cadastro onCadastrarProduto={cadastrarProduto} />}
            />

            <Route
              path="/listagem"
              element={
                <Listagem
                  produtos={produtos}
                  carregando={carregandoProdutos}
                  erroApi={erroApi}
                />
              }
            />

            <Route
              path="/movimentacoes"
              element={<Movimentacoes />}
            />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
