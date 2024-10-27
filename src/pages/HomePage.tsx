import { Container, Grid2 as Grid } from "@mui/material";
//import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    return (
        <Grid container flexDirection="column" minHeight="100vh">
            <Grid flexGrow={1} container>
                <Container sx={{ flex: 1 }}>
                    {/* Contenido de la página principal */}
                </Container>
            </Grid>
        </Grid>
    );
};