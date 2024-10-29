// theme.d.ts
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PaletteOptions,
  PaletteColor,
} from "@mui/material/styles/createPalette";

// Extender la interfaz PaletteOptions
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    verificando_uy_light: PaletteColor; // Definir como PaletteColor
  }

  interface PaletteOptions {
    verificando_uy_light: PaletteColor; // Definir como PaletteColor
  }
}
