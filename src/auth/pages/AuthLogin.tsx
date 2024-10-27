import { Login } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid2,
  Paper,
  Typography,
  Link as LinkMui,
} from "@mui/material";
import { useState } from "react";
import { FormContainer, FormItem } from "../components/Form";
import { OtherMethods } from "../components/OtherMethodAuthentication";
import { Link } from "react-router-dom";
import VerificandoUyIcon from "../../../public/verificandoUySoloImagen.svg";

export const LoginPage = () => {
  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");

  return (
    <Grid2
      container
      bgcolor="#29B78B"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("datos ingresados", { correo, contraseña });
        }}
      >
        <Paper
          sx={{ px: 2, pb: 2.5, pt: 0.5 }}
          className="animate__animated animate__fadeIn"
        >
          <Grid2 container justifyContent="center" mb={1}>
            <Avatar
              src={VerificandoUyIcon}
              sx={{
                height: 100,
                width: 100,
              }}
            />
          </Grid2>
          <FormContainer direction="column">
            <FormItem
              fullwidth
              type="email"
              dato={correo}
              onDatoChange={(newDato) => {
                setCorreo(newDato);
              }}
              label="Correo"
            />
            <FormItem
              dato={contraseña}
              onDatoChange={(newDato) => {
                setContraseña(newDato);
              }}
              fullwidth
              type="password"
              label="Contraseña"
            />
            <Button
              variant="contained"
              type="submit"
              size="small"
              startIcon={<Login />}
              color="verificando_uy_light"
            >
              Ingresar
            </Button>
            <OtherMethods />
            <Typography variant="caption">
              <LinkMui component={Link} to="/auth/signup">
                ¿Aún no tienes tu cuenta de VerificandoUy? Crea tu cuenta
              </LinkMui>
            </Typography>
          </FormContainer>
        </Paper>
      </form>
    </Grid2>
  );
};
