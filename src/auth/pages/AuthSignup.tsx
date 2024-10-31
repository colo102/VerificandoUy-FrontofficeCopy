import {
  Avatar,
  Button,
  Grid2,
  Paper,
  Typography,
  Link as LinkMui,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FormContainer, FormItem } from "../components/Form";
import { useState } from "react";
import { Login } from "@mui/icons-material";
import { OtherMethods } from "../components/OtherMethodAuthentication";
import { Link } from "react-router-dom";
import VerificandoUyIcon from "/src/assets/verificandoUySoloImagen.svg";
import useAuth from "../hooks/useAuth";
import { useGetRolesQuery } from "../../store/apis/verificandoUyBackend/verificandoUyBackend.api";
import { useAppDispatch } from "../../store/hooks/storeHooks";
import { addError } from "../../store/verificandoUy/verificandoUySlice";

export const SignupPage = () => {
  const [correo, setCorreo] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [rol, setRol] = useState<string>("");
  const dispatch = useAppDispatch();

  const { data } = useGetRolesQuery();

  const { signup } = useAuth();

  const esValidoFormulario = (): boolean => {
    if (
      !correo ||
      !nombre ||
      !apellido ||
      !fechaDeNacimiento ||
      !cedula ||
      !contraseña ||
      !rol
    )
      return false;

    return true;
  };

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!esValidoFormulario()) return;
    let rolSimbolo = "";

    switch (rol) {
      case "Admin":
        rolSimbolo = "A";
        break;
      case "Submitter":
        rolSimbolo = "S";
        break;
      case "Checker":
        rolSimbolo = "CH";
        break;
      case "Citizen":
        rolSimbolo = "CI";
        break;
    }
    if (!rolSimbolo) {
      dispatch(addError({ errorMessage: "El campo Rol es obligatorio" }));
      return;
    }

    signup({
      apellido,
      email: correo,
      cedula,
      fechaNacimiento: fechaDeNacimiento,
      nombre,
      password: contraseña,
      rol: rolSimbolo,
    });
  };

  return (
    <Grid2
      container
      bgcolor="#29B78B"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSignup}>
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
            <FormContainer direction="row">
              <FormItem
                size={6}
                dato={nombre}
                onDatoChange={(newDato) => {
                  setNombre(newDato);
                }}
                label="Nombre"
                type="text"
                placeholder="Jose"
              />
              <FormItem
                size={6}
                dato={apellido}
                onDatoChange={(newDato) => {
                  setApellido(newDato);
                }}
                label="Apellido"
                type="text"
                placeholder="Gonzalez"
              />
            </FormContainer>
            <FormContainer direction="row">
              <FormItem
                fullwidth
                label="Cedula"
                type="text"
                dato={cedula}
                onDatoChange={(newDato) => {
                  setCedula(newDato);
                }}
                size={6}
                placeholder="12345678"
              />
              <FormItem
                fullwidth
                label="Fecha de nacimiento"
                type="date"
                dato={fechaDeNacimiento}
                onDatoChange={(newDato) => {
                  setFechaDeNacimiento(newDato);
                }}
                size={6}
                placeholder="dd/MM/yyyy"
              />
            </FormContainer>
            <Grid2>
              <FormControl sx={{ width: "100%" }} size="small">
                <InputLabel id="rol-select">Rol</InputLabel>
                <Select
                  label="Rol"
                  labelId="rol-select"
                  value={rol}
                  onChange={(event) => {
                    setRol(event.target.value);
                  }}
                >
                  {data &&
                    data.map((rol, index) => (
                      <MenuItem value={rol} key={index + 1}>
                        {rol}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid2>
            <FormItem
              fullwidth
              label="correo"
              type="email"
              dato={correo}
              onDatoChange={(newDato) => {
                setCorreo(newDato);
              }}
              placeholder="josegonzalez@email.com"
            />
            <FormItem
              dato={contraseña}
              onDatoChange={(newDato) => {
                setContraseña(newDato);
              }}
              fullwidth
              label="Contraseña"
              type="password"
              placeholder="Ingrese su contraseña"
            />
            <Button
              variant="contained"
              type="submit"
              size="small"
              startIcon={<Login />}
              color="verificando_uy_light"
            >
              Registrar
            </Button>
            <OtherMethods />
            <Typography variant="caption">
              <LinkMui to="/auth/login" replace component={Link}>
                ¡Ya tengo una cuenta!
              </LinkMui>
            </Typography>
          </FormContainer>
        </Paper>
      </form>
    </Grid2>
  );
};
