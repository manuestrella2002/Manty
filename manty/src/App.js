import React from 'react';
import './App.css';
import Navbar from "./Navbar"; // Importa el Navbar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio'; // El componente para la lista de pedidos abiertos
import NuevoPedido from './NuevoPedido';
import PedidosCerrados from './PedidosCerrados';
import VerPedido from './VerPedido';
import ModificarPedido from './ModificarPedido';
import PedidosAreas from './PedidosAreas';



function App() {
  return (
  <div>
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Inicio />} />
        <Route path="/NuevoPedido" element={<NuevoPedido />} />
        <Route path="/PedidosCerrados" element={<PedidosCerrados />} />
        <Route path="/VerPedido/:id" element={<VerPedido />} />  {/* 👈 Asegúrate de que está bien */}
        <Route path="/ModificarPedido/:id" element={<ModificarPedido />} />  {/* 👈 Asegúrate de que está bien */}
        <Route path="/PedidosAreas/:area" element={<PedidosAreas />} />  {/* 👈 Asegúrate de que está bien */}
        </Routes>
        </Router>
        </div>
  );
}

export default App;
