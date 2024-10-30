import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";

import {crearHecho} from "../../store/verificandoUy/verificandoUySlice.ts";
import {AppDispatch, RootState} from "../../store/store.ts"; // Importa los tipos de RootState y AppDispatch si los tienes definidos

const CrearHechoForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");

    const loading = useSelector((state: RootState) => state.verificandoUy.isLoading);
    const error = useSelector((state: RootState) => state.verificandoUy.error);
    const success = useSelector((state: RootState) => state.verificandoUy.success);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(crearHecho({ nombre, descripcion, categoria }));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, boxShadow: 3, borderRadius: 2, p: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Crear Hecho
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <TextField
                    label="Descripción"
                    variant="outlined"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <TextField
                    label="Categoría"
                    variant="outlined"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? "Creando..." : "Crear Hecho"}
                </Button>
                {error.isError && <Typography color="error">{error.errorMessage}</Typography>}
                {success.isSuccess && <Typography color="success">{success.successMessage}</Typography>}
            </Box>
        </Container>
    );
};

export default CrearHechoForm;
