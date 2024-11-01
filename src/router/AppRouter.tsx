import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Chat } from "../components/chat/Chat";
import CrearHecho from "../components/crearHecho/CrearHecho";
import SugerirHecho from "../components/sugerirHecho/SugerirHecho.tsx";
import TomarHecho from "../components/tomarHecho/TomarHecho.tsx";
import VerificarHecho from "../components/verificarHecho/VerificarHecho.tsx";
import { Appbar } from "../shared/components/Appbar/Appbar";
import { AuthRouter } from "../auth/router/AuthRouter";
import { Alert, Box, CircularProgress, Fade, Snackbar, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat"; // Importa el ícono de chat
import { useAppDispatch, useAppSelector } from "../store/hooks/storeHooks";
import {removeError, removeSuccess} from "../store/verificandoUy/verificandoUySlice";
import PublicarHecho from "../components/publicarHecho/PublicarHecho.tsx";

export const AppRouter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { errorMessage, isError } = useAppSelector(
        (state) => state.verificandoUy.error
    );
    const { isSuccess, successMessage } = useAppSelector(
        (state) => state.verificandoUy.success
    );
    const isLoading = useAppSelector((state) => state.verificandoUy.isLoading);
    const isUserLogged = useAppSelector(
        (state) => state.verificandoUy.isUserLogged
    );

    if (isLoading) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    bgcolor: (theme) => theme.palette.verificando_uy_light.main,
                    color: "white",
                }}
            >
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <>
            {!location.pathname.includes("auth") && <Appbar />}
            <Routes>
                <Route element={<HomePage />} path="/" />
                {!isUserLogged && <Route element={<AuthRouter />} path="/auth/*" />}
                <Route element={<Chat />} path="/chat" />
                {/* Ruta padre para Gestión de Hecho */}
                <Route path="/gestion-hecho">
                    <Route path="crear" element={<CrearHecho />} />
                    <Route path="sugerir" element={<SugerirHecho />} />
                    <Route path="tomar" element={<TomarHecho />} />
                    <Route path="verificar" element={<VerificarHecho />} />
                    <Route path="publicar-cancelar" element={<PublicarHecho />} />
                </Route>
                <Route element={<HomePage />} path="/" />
                <Route element={<Navigate to="/" replace />} path="*" />
            </Routes>

            {/* Botón Flotante de Chat */}

                <Fab
                    color="primary"
                    aria-label="chat"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    onClick={() => navigate("/chat")}
                >
                    <ChatIcon />
                </Fab>


            {/* Notificaciones */}
            <Snackbar
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                open={isError}
                autoHideDuration={6000}
                onClose={() => {
                    dispatch(removeError());
                }}
                TransitionComponent={Fade}
            >
                <Alert variant="filled" severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                open={isSuccess}
                autoHideDuration={6000}
                onClose={() => {
                    dispatch(removeSuccess());
                }}
                TransitionComponent={Fade}
            >
                <Alert variant="filled" severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
