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

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
