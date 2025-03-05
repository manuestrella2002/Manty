import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NuevoPedido.css';

const NuevoPedido = () => {
  const navigate = useNavigate();  // 🚀 Para redirigir después de crear el pedido

  const [formData, setFormData] = useState({
    descripcion: '',
    fecha: '',  // Esta será la fecha que mostrará el usuario en formato dd-mm-yyyy
    lugar: '',
    solicitadoPor: '',
    area: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Obtener la fecha actual en formato dd-mm-yyyy
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');  // Día con 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Mes con 2 dígitos
    const year = today.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;  // Formato dd-mm-yyyy
    setFormData((prevState) => ({ ...prevState, fecha: formattedDate }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtener la fecha y hora actual
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');

      // Crear la fecha y hora en el formato yyyy-mm-dd hh:mm:ss para MySQL
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      // Actualizamos el formulario con la fecha y hora actual
      const updatedFormData = { ...formData, fecha: formattedDateTime };

      const response = await fetch('http://localhost:5000/api/pedidos', {  // ⚠️ Verifica la URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      alert("Pedido creado exitosamente");
      navigate('/');  // 🔄 Redirige a la página de inicio

    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Hubo un error al crear el pedido. Verifica la consola.");
    }
  };

  return (
    <div className="form-container">
      <h1>Nuevo Pedido</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Fecha:</label>
          {/* Campo de solo lectura para mostrar la fecha actual en formato dd-mm-yyyy */}
          <input type="text" name="fecha" value={formData.fecha} readOnly required />
        </div>

        <div className="form-group">
          <label>Lugar:</label>
          <input type="text" name="lugar" value={formData.lugar} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Solicitado por:</label>
          <input type="text" name="solicitadoPor" value={formData.solicitadoPor} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Área:</label>
          <select name="area" value={formData.area} onChange={handleChange} required>
          <option value="">Seleccionar Área</option>
          <option value="Albañilería">Albañilería</option>
          <option value="Aire acondicionado">Aire acondicionado</option>
          <option value="Carpintería">Carpintería</option>
          <option value="Electricidad">Electricidad</option>
          <option value="Electromedicina">Electromedicina</option>
          <option value="Herrería">Herrería</option>
          <option value="Plomería">Plomería</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">Crear Pedido</button>
      </form>
    </div>
  );
};

export default NuevoPedido;
