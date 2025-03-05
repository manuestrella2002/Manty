import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Elimina Navigate de aquí
import './ModificarPedido.css';
import axios from 'axios';

const ModificarPedido = () => {
  const { id } = useParams(); // Obtiene el id del pedido de la URL
  const navigate = useNavigate();

  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false); // Para verificar si el pedido fue guardado correctamente

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name]: value });
  };

  const handleSave = async () => {
    try {
        debugger
      await axios.put(`http://192.168.1.7:5000/api/pedidos/${id}`, pedido);
      setIsSaved(true);
      alert('Pedido guardado correctamente');
      navigate(`/`); // Redirige al detalle del pedido
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      alert('Error al guardar el pedido. Verifique la consola.');
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
      <h1>Modificar Pedido</h1>
      {/* Mostrar el ID del pedido */}
      <div className="pedido-group">
        <label className="pedido-label">ID del pedido:</label>
        <input className="pedido-info" type="text" value={`Roffo-DMI-${id}`} readOnly />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Descripción:</label>
        <textarea
          className="pedido-info pedido-descripcion"
          name="descripcion_pedido"
          value={pedido.descripcion_pedido}
          onChange={handleChange}
        />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Fecha:</label>
        <input className="pedido-info" type="text" value={fechaFormateada} readOnly />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Lugar:</label>
        <input
          className="pedido-info"
          type="text"
          name="lugar_pedido"
          value={pedido.lugar_pedido}
          onChange={handleChange}
        />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Solicitado por:</label>
        <input
          className="pedido-info"
          type="text"
          name="solicitadopor_pedido"
          value={pedido.solicitadopor_pedido}
          onChange={handleChange}
        />
      </div>

      <div className="pedido-group">
        <label className="pedido-label">Área:</label>
        <input
          className="pedido-info"
          type="text"
          name="area_pedido"
          value={pedido.area_pedido}
          onChange={handleChange}
        />
      </div>

      <button className="boton-guardar" onClick={handleSave}>Guardar</button>
      <a href="/" className="boton-volver">Volver</a>

      {isSaved && <p className="mensaje-exito">El pedido ha sido guardado exitosamente.</p>}
    </div>
  );
};

export default ModificarPedido;
