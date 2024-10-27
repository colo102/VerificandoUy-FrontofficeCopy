import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    allowedRoles: string[]; // Array de roles permitidos para la ruta
}

// Componente para rutas privadas que verifica los roles permitidos
const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
    const userRole = localStorage.getItem('userRole');

    // Si el rol del usuario está permitido, renderiza el contenido
    if (userRole && allowedRoles.includes(userRole)) {
        return <Outlet />;
    }

    // Si el usuario no está autenticado o no tiene permisos, redirige a la página de inicio o login
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;