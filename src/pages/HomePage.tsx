import { Button, Container, Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <Grid container flexDirection="column" minHeight="100vh">
        <Grid flexGrow={1} container>
          <Main />
        </Grid>
      </Grid>
    </>
  );
};

const Main = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ flex: 1 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        height="100%"
      >
        <Button
          variant="outlined"
          onClick={() => {
            navigate("chat");
          }}
        >
          Chat
        </Button>
      </Grid>
    </Container>
  );
};
