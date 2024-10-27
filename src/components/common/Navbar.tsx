import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav>
            <h1>Verificando UY</h1>
            <Link to="/login">Login</Link>
            <Link to="/register/submitter">Registrarse como Submitter</Link>
            <Link to="/register/checker">Registrarse como Checker</Link>
            <Link to="/register/citizen">Registrarse como Citizen</Link>
            <Link to="/register/admin">Registrarse como Admin</Link>
        </nav>
    );
};

export default Navbar;