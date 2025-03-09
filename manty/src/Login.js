import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificamos si el usuario ya está logueado al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      navigate('/Inicio'); // Redirigir al inicio si ya está logueado
    }
  }, [navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Por favor, ingresa tu nombre de usuario y contraseña');
      return;
    }

    // Simulando la verificación del login
    if (username === 'usuario' && password === 'contraseña') {
      // Guardar el estado de login en localStorage
      localStorage.setItem('username', username);
      navigate('/Inicio'); // Redirigir a la página de inicio
      alert('¡Bienvenido!');
    } else {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
