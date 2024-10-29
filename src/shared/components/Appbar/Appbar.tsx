import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";
import "./Appbar.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/storeHooks";
import useAuth from "../../../auth/hooks/useAuth";

export const Appbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isUserLogged = useAppSelector(
    (state) => state.verificandoUy.isUserLogged
  );
  const user = useAppSelector((state) => state.verificandoUy.usuario);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="verificando_uy_light">
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
            className="brandNameAppbar"
            sx={{ flexGrow: 1, userSelect: "none" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Verificando UY
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              if (!isUserLogged) {
                navigate("/auth/login");
                return;
              }
              logout({ jwt: user.token });
            }}
          >
            {!isUserLogged ? "Login" : "Logout"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
