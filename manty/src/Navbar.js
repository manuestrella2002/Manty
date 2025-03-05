import React from "react";
import { Link } from "react-router-dom"; // Importa Link de React Router
import "./Navbar.css"; // Importamos el archivo CSS
import logo from "./recursos/imagenes/LOGO-UBAROFFO.png"; // Ruta al logo, ajusta según la ubicación de tu archivo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo y texto */}
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">Manty</span> {/* Aquí agregamos el texto "Manty" */}
        </div>

        {/* Menú de navegación */}
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/NuevoPedido">Nuevo Pedido</Link></li>
          <li><Link to="/PedidosCerrados">Pedidos cerrados</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
