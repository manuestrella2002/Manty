import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css'; // Asegúrate de crear este archivo para los estilos

const areas = [
  'Albañilería', 
  'Aire acondicionado', 
  'Carpintería', 
  'Electricidad', 
  'Electromedicina', 
  'Herrería', 
  'Plomería'
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleAreaClick = (area) => {
    navigate(`/PedidosAreas/${encodeURIComponent(area)}`);
  };

  return (
    <div className="sidebar">
      <h3>Talleres</h3>
      <ul>
        {areas.map((area) => (
          <li key={area} onClick={() => handleAreaClick(area)}>
            {area}
          </li>
        ))}
        {/* Opción "Todos" para volver a inicio */}
        <li key="todos" onClick={() => navigate("/")} className="todos">
          Todos
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
