import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>StockFlow</h2>
        <span>Controle de estoque</span>
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>

        <li>
          <NavLink to="/cadastro">Cadastro</NavLink>
        </li>

        <li>
          <NavLink to="/listagem">Listagem</NavLink>
        </li>

        <li>
          <NavLink to="/movimentacoes">Movimentacoes</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
