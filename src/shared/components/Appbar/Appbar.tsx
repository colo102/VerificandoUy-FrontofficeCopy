import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    MenuItem,
    Menu,
    Container,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/storeHooks";
import useAuth from "../../../auth/hooks/useAuth";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

export const Appbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const isUserLogged = useAppSelector((state) => state.verificandoUy.isUserLogged);
    const user = useAppSelector((state) => state.verificandoUy.usuario);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout({ jwt: user.token });
        navigate("/"); // Redirige al inicio después del logout
    };

    return (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: '#29B78B',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    marginX: 2,
                    maxWidth: 'calc(100% - 32px)',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'bold',
                                color: 'white',
                                cursor: 'pointer',
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '1.25rem',
                                userSelect: 'none',
                            }}
                            onClick={() => navigate("/")}
                        >
                            Verificando UY
                        </Typography>

                        {/* Botón de Gestión de Hecho visible siempre */}
                        <Button
                            onClick={handleMenuOpen}
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '500',
                                textTransform: 'capitalize',
                                fontSize: '1rem',
                                color: 'white',
                                mx: 1,
                                '&:hover': {
                                    color: 'lightgray',
                                },
                            }}
                        >
                            HECHOS
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose} component={Link} to="/gestion-hecho/crear">
                                Crear Hecho
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/gestion-hecho/listar">
                                Listar Hechos
                            </MenuItem>
                        </Menu>

                        {/* Botón de Login/Logout Condicional */}
                        <Button
                            variant={isUserLogged ? "text" : "contained"}
                            color="inherit"
                            onClick={() => {
                                if (isUserLogged) {
                                    handleLogout();
                                } else {
                                    navigate("/auth/login");
                                }
                            }}
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '500',
                                textTransform: 'capitalize',
                                fontSize: '1rem',
                                color: isUserLogged ? 'white' : '#29B78B',
                                bgcolor: isUserLogged ? 'transparent' : 'white',
                                borderRadius: '8px',
                                px: 2,
                                '&:hover': {
                                    bgcolor: isUserLogged ? 'rgba(255, 255, 255, 0.1)' : '#f1f1f1',
                                },
                            }}
                        >
                            {isUserLogged ? "Logout" : "Login"}
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};
