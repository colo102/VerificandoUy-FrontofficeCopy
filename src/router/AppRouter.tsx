import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Chat } from "../components/chat/Chat";
import { Appbar } from "../shared/components/Appbar/Appbar";
import { AuthRouter } from "../auth/router/AuthRouter";
import { Alert, Box, CircularProgress, Fade, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks/storeHooks";
import {
  removeError,
  removeSuccess,
} from "../store/verificandoUy/verificandoUySlice";

export const AppRouter = () => {
  const location = useLocation();
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
        <Route element={<Navigate to="/" replace />} path="*" />
      </Routes>
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
