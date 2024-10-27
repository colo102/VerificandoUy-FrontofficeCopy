import { Button, Grid2, Typography } from "@mui/material";

export const OtherMethods = () => {
  return (
    <Grid2 container flexDirection="column">
      <Grid2 container alignItems="center" alignContent="center" spacing={1}>
        <Grid2 flex={1}>
          <hr />
        </Grid2>
        <Grid2 container alignItems="center">
          <Typography variant="caption" component="span">
            O inicia sesion con
          </Typography>
        </Grid2>
        <Grid2 flex={1}>
          <hr />
        </Grid2>
      </Grid2>
      <Grid2 container justifyContent="center">
        <Button
          size="small"
          onClick={(event) => {
            event.preventDefault();
            window.location.href =
              "http://localhost:8080/oauth2/authorization/iduruguay";
          }}
        >
          <Typography variant="caption" component="span">
            Gub.uy
          </Typography>
        </Button>
      </Grid2>
    </Grid2>
  );
};
