import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerPedido.css';
import axios from 'axios';

const VerPedido = () => {
  const { id } = useParams(); // Obtiene el id del pedido de la URL

  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        const response = await axios.get(`http://192.168.1.7:5000/api/pedidos/${id}`);
        setPedido(response.data);
      } catch (error) {
        console.error('Error al obtener el pedido:', error);
        alert('No se pudo cargar el pedido. Verifique la consola.');
      } finally {
        setLoading(false);
      }
    };

    obtenerPedido();
  }, [id]);

  const handleImprimir = () => {
    try {
      if (!document.execCommand('print', false, null)) {
        window.print();
      }
    } catch {
      window.print();
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!pedido) {
    return <div>No se encontró el pedido.</div>;
  }

  // Formatear la fecha con la API nativa
  const fecha = new Date(pedido.fecha_pedido);
  const fechaFormateada = `${('0' + fecha.getDate()).slice(-2)}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()} ${('0' + fecha.getHours()).slice(-2)}:${('0' + fecha.getMinutes()).slice(-2)}`;

  return (
    <div className="pedido-container">
      <h1>Constancia de pedido</h1>
      <h2>Dirección de Mantenimiento e Infraestructura</h2>
      <h3>Instituto de Oncología "Ángel H. Roffo"</h3>

      {/* Mostrar el ID del pedido */}
      <div className="pedido-group">
        <label className="pedido-label">ID del pedido:</label>
        <input className="pedido-info" type="text" value={`Roffo-DMI-${id}`} readOnly />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Descripción:</label>
        <textarea className="pedido-info pedido-descripcion" value={pedido.descripcion_pedido} readOnly />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Fecha:</label>
        <input className="pedido-info" type="text" value={fechaFormateada} readOnly />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Lugar:</label>
        <input className="pedido-info" type="text" value={pedido.lugar_pedido} readOnly />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Solicitado por:</label>
        <input className="pedido-info" type="text" value={pedido.solicitadopor_pedido} readOnly />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Área:</label>
        <input className="pedido-info" type="text" value={pedido.area_pedido} readOnly />
      </div>

      <button className="boton-imprimir" onClick={handleImprimir}>Imprimir</button>
      <a href="/" className="boton-volver">Volver</a>
    </div>
  );
};

export default VerPedido;
