import {
    Box,
    Checkbox,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
} from '@mui/material';
import {useEffect, useState} from "react";
import { RootState } from "../../store/store.ts";
import {fetchHechosConFiltro, tomarHecho} from "../../store/verificandoUy/verificandoUySlice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks/storeHooks.ts";

const TomarHechos = () => {
    const dispatch = useAppDispatch();
    const hechosFromRedux = useAppSelector((state: RootState) => state.verificandoUy.hechosFiltrados);
    const isLoading = useAppSelector((state: RootState) => state.verificandoUy.isLoading);

    // Estado para almacenar el ID del hecho seleccionado
    const [selectedHechoId, setSelectedHechoId] = useState<string | null>(null);

    // Configuro el filtro una sola vez
    const filtros = { estado: "NUEVO", submitterId: "", checkerId: "" };

    // useEffect que solo se ejecuta una vez al montar el componente y cuando `hechosFromRedux` está vacío
    useEffect(() => {
        if (!isLoading && hechosFromRedux.length === 0) {
            dispatch(fetchHechosConFiltro(filtros));
        }
    }, [dispatch, isLoading, hechosFromRedux.length]); // Dependencias ajustadas

    const handleSeleccionarHecho = (id: string) => {
        // Si ya está seleccionado, deselecciona; si no, selecciona el nuevo
        setSelectedHechoId(prevId => (prevId === id ? null : id));
    };

    const verificarHechos = () => {
        if (selectedHechoId) {
            dispatch(tomarHecho(selectedHechoId));
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'normal', color: 'inherit', mb: 4 }}>
                Hechos pendientes para ser tomados
            </Typography>

            {/* Verificar si los datos están cargando */}
            {isLoading ? (
                <Typography variant="h6" align="center">Cargando hechos...</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Seleccionar</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Categoria</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hechosFromRedux.map(hecho => (
                                <TableRow key={hecho.id}>
                                    <TableCell>
                                        <Checkbox

                                            checked={selectedHechoId === hecho.id}
                                            onChange={() => handleSeleccionarHecho(hecho.id)}
                                            disabled={selectedHechoId !== null && selectedHechoId !== hecho.id} // Deshabilita si otro hecho está seleccionado

                                        />
                                    </TableCell>
                                    <TableCell>{hecho.nombre}</TableCell>
                                    <TableCell>{hecho.descripcion}</TableCell>
                                    <TableCell>{hecho.dateCreated}</TableCell>
                                    <TableCell>{hecho.categoria}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Botón Verificar Debajo de la Tabla */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedHechoId} // Solo se habilita si hay un hecho seleccionado
                    onClick={verificarHechos}
                >
                    Enviar para Verificar
                </Button>
            </Box>
        </Container>
    );
};

export default TomarHechos;