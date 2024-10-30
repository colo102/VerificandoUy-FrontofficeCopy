import {
    Box,
    Container,

    Button,
} from "@mui/material";


export const HomePage = () => {
return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>


        {/* Barra de categorías */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Button color="primary" sx={{ mx: 1 }}>Todas las categorias</Button>

        </Box>


    </Container>
);
};

