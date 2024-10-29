import { PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    verificando_uy_light: PaletteColorOptions;
  }
}

import { AppBarPropsColorOverrides } from "@mui/material/AppBar";

// Extender la interfaz
interface CustomAppBarPropsColorOverrides extends AppBarPropsColorOverrides {
  verificando_uy_light?: true; // Añadir '?' para hacerlo opcional
}

// Usar la declaración de módulo para extender la interfaz de AppBar
declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides extends CustomAppBarPropsColorOverrides {
    verificando_uy_light: true; // Asegúrate de que sea una propiedad válida
  }
}
