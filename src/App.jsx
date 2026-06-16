import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';
import Movimentacoes from './pages/Movimentacoes';

import Navbar from './components/Navbar';
import { ProdutosProvider } from './contexts/ProdutosContext';

import './styles/global.css';
import './styles/feature09.css';

function App() {
  return (
    <Router>
      <ProdutosProvider>
        <div className="App">
          <div className="container">
            <Navbar />

            <main className="page-shell">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/listagem" element={<Listagem />} />
                <Route path="/movimentacoes" element={<Movimentacoes />} />
              </Routes>
            </main>
          </div>
        </div>
      </ProdutosProvider>
    </Router>
  );
}

export default App;
