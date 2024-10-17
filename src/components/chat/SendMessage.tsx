import { Send } from "@mui/icons-material";
import {
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { FirebaseDB } from "../../firebase/firebase.config";

export const SendMessage = () => {
  const [message, setMessage] = useState<string>("");
  const usuarioId = "usuarioPrueba";
  const usuarioNombre = "nombreUsuarioPrueba";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message === "") return; //Agregar aca un tipo de mensaje (alerta) para avisar al usuario que debe ingresar algun mensaje antes de enviar.
    await addDoc(collection(FirebaseDB, `messages`), {
      text: message,
      /* name: displayName,
            uid,
            photo: photoURL, */
      timestamp: serverTimestamp(),
      usuarioId,
      nombreDeUsuario: usuarioNombre,
    });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        sx={{ borderTop: "1px solid #777", p: 0.5, bgcolor: "#333" }}
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid flex={1} sx={{ py: 0.5 }}>
          <TextField
            fullWidth
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(event) => {
              const newValue = event.target.value;
              if (newValue === null) return;
              setMessage(event.target.value);
            }}
            sx={{
              bgcolor:
                "white" /*averiguar como arreglar que solo el fondo del input quede de este color*/,
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={message.trim().length === 0}
                      type="submit"
                      edge="end"
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
};
