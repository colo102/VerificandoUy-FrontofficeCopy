// src/components/common/Register.tsx
import React, { useState } from 'react';

//import { useParams } from 'react-router-dom';// obtener el rol desde la URL. Así, el componente será completamente dinámico y usará el rol especificado en la URL.
import axios from 'axios';
//import axios, { AxiosError } from 'axios';



const Register: React.FC = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [cedula, setCedula] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('S'); // Valor inicial como 'submitter'
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const usuarioData = {
                nombre,
                apellido,
                email,
                fechaNacimiento,
                cedula,
                password,
                rol,
            };
            const response = await axios.post("http://localhost:8080/registerUsuario", usuarioData);
            console.log("Registro exitoso:", response.data);
            //console.log('Registro simulado exitoso');
            // alert('Registro simulado exitoso'); // O muestra un mensaje en pantalla
            alert("Registro exitoso"); // Mostrar un mensaje en pantalla
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                // Si es un error de Axios, intentamos capturar el mensaje específico de respuesta
                console.log(err.response?.data);
                setError(err.response?.data || 'Error al registrar el usuario');
            } else {
                // Si el error no es de Axios, mostramos un mensaje genérico
                console.log("Error desconocido:", err);
                setError('Error al registrar el usuario');
            }
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Registrar Usuario</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Fecha de Nacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
            >
                <option value="S">Submitter</option>
                <option value="A">Admin</option>
                <option value="CH">Checker</option>
                <option value="CI">Citizen</option>
            </select>
                <button type="submit">Registrarse</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
);
};
export default Register;
