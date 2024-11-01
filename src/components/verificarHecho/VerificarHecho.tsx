import { useState, useEffect } from 'react';
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
    TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/storeHooks';
import { RootState } from '../../store/store';
import { fetchHechosPendientes, verificarHecho } from '../../store/verificandoUy/verificandoUySlice';

const VerificarHecho = () => {
    const dispatch = useAppDispatch();
    const hechosFromRedux = useAppSelector((state: RootState) => state.verificandoUy.hechosEnProceso);
    const isLoading = useAppSelector((state: RootState) => state.verificandoUy.isLoading);

    // Estado para el hecho seleccionado, justificación y puntuación
    const [selectedHechoId, setSelectedHechoId] = useState<string | null>(null);
    const [justification, setJustification] = useState<string>('');
    const [score, setScore] = useState<number>(0);

    // Trae los hechos pendientes al cargar el componente
    useEffect(() => {
        if (!isLoading && hechosFromRedux.length === 0) {
            dispatch(fetchHechosPendientes());
        }
    }, [dispatch, isLoading, hechosFromRedux.length]);

    // Maneja la selección de un hecho
    const handleSeleccionarHecho = (id: string) => {
        setSelectedHechoId(prevId => (prevId === id ? null : id));
    };

    // Despacha la acción para verificar el hecho seleccionado
    const handleVerificarHecho = () => {
        if (selectedHechoId) {
            dispatch(verificarHecho({ hechoId: selectedHechoId, justification, score }));
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'normal', color: 'inherit', mb: 4 }}>
                Hechos pendientes de verificación
            </Typography>

            {/* Tabla de hechos pendientes */}
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
                                <TableCell>Submitter ID</TableCell>
                                <TableCell>Checker ID</TableCell>
                                <TableCell>Fecha de creación</TableCell>
                                <TableCell>Categoría</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hechosFromRedux.map(hecho => (
                                <TableRow key={hecho.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedHechoId === hecho.id}
                                            onChange={() => handleSeleccionarHecho(hecho.id)}
                                            disabled={selectedHechoId !== null && selectedHechoId !== hecho.id}
                                        />
                                    </TableCell>
                                    <TableCell>{hecho.nombre}</TableCell>
                                    <TableCell>{hecho.descripcion}</TableCell>
                                    <TableCell>{hecho.submitter}</TableCell>
                                    <TableCell>{hecho.checker}</TableCell>
                                    <TableCell>{hecho.dateCreated}</TableCell>
                                    <TableCell>{hecho.categoria}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Justificación y puntuación */}
            <Box sx={{ mt: 3 }}>
                <TextField
                    label="Justificación"
                    fullWidth
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Puntuación"
                    type="number"
                    fullWidth
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    sx={{ mb: 2 }}
                />
            </Box>

            {/* Botón Enviar para Verificar */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedHechoId || !justification || score === 0}
                    onClick={handleVerificarHecho}
                >
                    Enviar para Publicar
                </Button>
            </Box>
        </Container>
    );
};

export default VerificarHecho;
