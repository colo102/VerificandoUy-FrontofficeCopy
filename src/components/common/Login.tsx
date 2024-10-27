// src/components/common/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/logIn', {
                email,
                password,
            });
            const { token, role } = response.data;

            // Guardar el token en el local storage o en el estado de la aplicación
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);

            // Redirigir al usuario según su rol
            switch (role) {
                case 'submitter':
                    navigate('/submitter/SubmitterDashboard');
                    break;
                case 'checker':
                    navigate('/checker/CheckerDashboard');
                    break;
                case 'citizen':
                    navigate('/citizen/CitizenDashboard');
                    break;
                case 'admin':
                    navigate('/admin/AdminDashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            console.error(err);

            setError('Credenciales incorrectas');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Iniciar Sesión</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;
