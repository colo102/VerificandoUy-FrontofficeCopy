import {
    Box,
    Checkbox,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
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
import { useState } from "react";

type Hecho = {
    id: string;
    nombre: string;
    descripcion: string;
    estado: string;
    submitter: string;
    checker: string;
    seleccionado: boolean;
};

const initialHechos: Hecho[] = [
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    { id: '1', nombre: 'Hecho 1', descripcion: 'Descripción 1', estado: 'Pendiente', submitter: 'Usuario A', checker: 'Usuario B', seleccionado: false },
    { id: '2', nombre: 'Hecho 2', descripcion: 'Descripción 2', estado: 'Verificado', submitter: 'Usuario C', checker: 'Usuario D', seleccionado: false },
    // Agrega más hechos según sea necesario para probar el desplazamiento
];

const ListarHechos = () => {
    const [hechos, setHechos] = useState(initialHechos);
    const [filtros, setFiltros] = useState({
        estado: '',
        submitter: '',
        checker: '',
    });

    const handleFiltroChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const handleSeleccionarHecho = (id: string) => {
        setHechos(hechos.map(hecho => hecho.id === id ? { ...hecho, seleccionado: !hecho.seleccionado } : hecho));
    };

    const verificarHechos = () => {
        const hechosParaVerificar = hechos.filter(hecho => hecho.seleccionado);
        console.log("Hechos a verificar:", hechosParaVerificar);
        // Aquí podrías agregar la lógica para enviar los hechos al backend usando fetch o axios
    };

    const hechosFiltrados = hechos.filter(hecho => {
        return (
            (filtros.estado === '' || hecho.estado === filtros.estado) &&
            (filtros.submitter === '' || hecho.submitter === filtros.submitter) &&
            (filtros.checker === '' || hecho.checker === filtros.checker)
        );
    });

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'normal', color: 'inherit', mb: 4 }}>
                Listado de hechos existentes
            </Typography>

            {/* Filtros */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                        name="estado"
                        value={filtros.estado}
                        onChange={handleFiltroChange}
                        label="Estado"
                        required
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="Verificado">Verificado</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Submitter</InputLabel>
                        <Select
                            name="submitter"
                            value={filtros.submitter}
                            onChange={handleFiltroChange}
                            label="Submitter"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="Usuario A">Usuario A</MenuItem>
                            <MenuItem value="Usuario C">Usuario C</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Checker</InputLabel>
                        <Select
                            name="checker"
                            value={filtros.checker}
                            onChange={handleFiltroChange}
                            label="Checker"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="Usuario B">Usuario B</MenuItem>
                            <MenuItem value="Usuario D">Usuario D</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Contenedor de Tabla con Desplazamiento */}
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Seleccionar</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Submitter</TableCell>
                            <TableCell>Checker</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hechosFiltrados.map(hecho => (
                            <TableRow key={hecho.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={hecho.seleccionado}
                                        onChange={() => handleSeleccionarHecho(hecho.id)}
                                    />
                                </TableCell>
                                <TableCell>{hecho.nombre}</TableCell>
                                <TableCell>{hecho.descripcion}</TableCell>
                                <TableCell>{hecho.estado}</TableCell>
                                <TableCell>{hecho.submitter}</TableCell>
                                <TableCell>{hecho.checker}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Botón Verificar Debajo de la Tabla */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!hechos.some(hecho => hecho.seleccionado)}
                    onClick={verificarHechos}
                >
                    Enviar para Verificar
                </Button>
            </Box>
        </Container>
    );
};

export default ListarHechos;
