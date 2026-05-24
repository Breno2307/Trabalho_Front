import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>StockFlow</h2>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Início</Link>
        </li>

        <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>

        <li>
          <Link to="/listagem">Listagem</Link>
        </li>

        <li>
          <Link to="/movimentacoes">Movimentações</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;