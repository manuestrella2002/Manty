import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PedidosCerrados.css';
import { FaClockRotateLeft } from "react-icons/fa6";
const PedidosCerrados = () => {
  const [pedidosCerrados, setPedidosCerrados] = useState([]);

  useEffect(() => {
    // Obtener los pedidos desde el servidor
    axios.get('http://192.168.1.7:5000/api/pedidos/cerrados')  // Cambia la URL si es necesario
      .then(response => {
        setPedidosCerrados(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los pedidos:', error);
      });
  }, []);


  // Función para formatear la fecha y hora
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Obtener componentes de la fecha
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    // Obtener componentes de la hora
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Devolver la fecha con el formato dd-mm-yyyy hh:mm
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleReopen = (id) => {
    // Obtener los datos actuales del pedido
    debugger;
    axios.get(`http://192.168.1.7:5000/api/pedidos/${id}`)
      .then(response => {
        const pedido = response.data;
        debugger;
        // Modificar solo el estado del pedido
        const pedidoActualizado = {
          ...pedido,
          estado_pedido: 'Abierto'
        };
  
        // Enviar la actualización
        axios.put(`http://192.168.1.7:5000/api/pedidos/${id}`, pedidoActualizado)
          .then(response => {
            // Recargar la lista de pedidos actualizada
            axios.get('http://192.168.1.7:5000/api/pedidos/cerrados')
              .then(response => {
                setPedidosCerrados(response.data);  // Actualiza la lista de pedidos
              })
              .catch(error => {
                console.error('Hubo un error al obtener los pedidos actualizados:', error);
              });
  
            console.log('Pedido cerrado con éxito');
          })
          .catch(error => {
            console.error('Error al cerrar el pedido:', error);
          });
  
      })
      .catch(error => {
        console.error('Error al obtener los datos del pedido:', error);
      });
  };
  

  return (
    <div>
      <h1>Trabajos Cerrados</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th> 
            <th>Descripción</th>
            <th>Lugar</th>
            <th>Solicitado por</th>
            <th>Área</th>
            <th>Estado</th>
            <th>Acciones</th> {/* Columna de acciones, solo con editar */} 
          </tr>
        </thead>
        <tbody>
          {/* Mapeamos los pedidos y los mostramos */}
          {pedidosCerrados.map((pedido) => (
            <tr key={pedido.idpedido}>
              <td>{`Roffo-DMI-${pedido.idpedido}`}</td>  {/* Formato del id */}
              <td>{formatDate(pedido.fecha_pedido)}</td> {/* Mostramos la fecha y hora formateada */}
              <td>{pedido.descripcion_pedido}</td>
              <td>{pedido.lugar_pedido}</td>
              <td>{pedido.solicitadopor_pedido}</td>
              <td>{pedido.area_pedido}</td>
              <td>{pedido.estado_pedido}</td>
              {/* Columna de acciones con los botones dentro */}
              <td>
                <button onClick={() => handleReopen(pedido.idpedido)} className="btn-reopen">
                  <FaClockRotateLeft /> {/* Icono de editar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosCerrados;
