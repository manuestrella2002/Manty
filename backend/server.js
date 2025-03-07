const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());  // Habilitar JSON en las solicitudes

// Conexión a la base de datos con soporte para Promises
const db = mysql.createPool({
  host: 'localhost',
  user: 'cliente_manty',
  password: '1204',
  database: 'manty_bd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();  // Habilita Promises para usar async/await

// Verifica conexión a la base de datos
db.getConnection()
  .then(() => console.log('Conectado a MySQL'))
  .catch(err => console.error('Error al conectar a MySQL:', err));

// 🟢 Endpoint para obtener todos los pedidos abiertos
app.get('/api/pedidos', async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM pedido WHERE estado_pedido = "Abierto" ORDER BY fecha_pedido DESC');
    res.json(result);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
});

app.get('/api/pedidos/area/:area_pedido', async (req, res) => {
  try {
    const area_pedido = req.params.area_pedido; // Asegurando que se recibe el parámetro correctamente
    console.log(`Área recibida: ${area_pedido}`); // Debugging

    const [result] = await db.query(
      'SELECT * FROM pedido WHERE area_pedido = ? AND estado_pedido = "Abierto" ORDER BY fecha_pedido DESC',
      [area_pedido]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: `No hay pedidos abiertos en el área: ${area_pedido}` });
    }

    res.json(result);
  } catch (error) {
    console.error(`Error al obtener los pedidos del área ${req.params.area_pedido}:`, error);
    res.status(500).json({ error: `Error al obtener los pedidos del área ${req.params.area_pedido}` });
  }
});


// 🟢 Endpoint para obtener todos los pedidos cerrados
app.get('/api/pedidos/cerrados', async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM pedido WHERE estado_pedido = "Cerrado" ORDER BY fecha_pedido DESC');
    res.json(result);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
});

// 🟢 Endpoint para crear un nuevo pedido
app.post('/api/pedidos', async (req, res) => {
  try {
    const { descripcion, fecha, lugar, solicitadoPor, area } = req.body;

    if (!descripcion || !fecha || !lugar || !solicitadoPor || !area) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    await db.query(
      'INSERT INTO pedido (descripcion_pedido, fecha_pedido, lugar_pedido, solicitadopor_pedido, area_pedido, estado_pedido) VALUES (?, ?, ?, ?, ?, ?)', 
      [descripcion, fecha, lugar, solicitadoPor, area,"Abierto"]
    );

    res.status(201).json({ mensaje: "Pedido creado correctamente" });

  } catch (error) {
    console.error("Error en el backend:", error);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
});

// Endpoint para obtener un pedido específico por su id
app.get('/api/pedidos/:idpedido', async (req, res) => {
  const { idpedido } = req.params; // Obtener el idpedido de la URL
  try {
    // Consultar el pedido con el idpedido especificado
    const [result] = await db.query(
      'SELECT * FROM pedido WHERE idpedido = ?',
      [idpedido]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(result[0]); // Retornar el primer (y único) resultado
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
});

// 🟢 Ruta para actualizar un pedido (modificar datos o cambiar estado)
app.put('/api/pedidos/:idpedido', async (req, res) => {
  const { idpedido } = req.params;  
  const { estado_pedido, descripcion_pedido, lugar_pedido, solicitadopor_pedido, area_pedido } = req.body;

  try {
    let query = "";
    let params = [];
    query = 'UPDATE pedido SET descripcion_pedido = ?, lugar_pedido = ?, solicitadopor_pedido = ?, area_pedido = ?, estado_pedido = ? WHERE idpedido = ?';
    params = [descripcion_pedido, lugar_pedido, solicitadopor_pedido, area_pedido, estado_pedido, idpedido];
  
    console.log(params);
    // Ejecutar la consulta
    const [result] = await db.query(query, params);
    console.log(query);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json({ mensaje: 'Pedido actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
