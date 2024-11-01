import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useLazyGetFilterHechosQuery } from "../../store/apis/verificandoUyBackend/verificandoUyBackend.api";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks/storeHooks";
import { addError } from "../../store/verificandoUy/verificandoUySlice";
import { Status } from "../../interfaces/hecho.interfaces";

const estados: Status[] = [
  Status.NUEVO,
  Status.EN_PROCESO,
  Status.VERIFICADO,
  Status.PUBLICADO,
  Status.CANCELADO,
];

export const GraficosPage = () => {
  const [filterHechosTrigger] = useLazyGetFilterHechosQuery();
  const [checkerId, setCheckerId] = useState("");
  const [submitterId, setSubmitterId] = useState("");
  const [estado, setEstado] = useState("");
  const dispatch = useAppDispatch();

  function parseStatus(value: string): Status | undefined {
    if (Object.values(Status).includes(value as Status)) {
      return value as Status;
    }
    return undefined; // o puedes lanzar un error si el valor no es válido
  }

  const handleSubmitFilter = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!checkerId || !submitterId) {
      dispatch(
        addError({
          errorMessage:
            !checkerId && !submitterId
              ? "Son necesarios los campos checkerId y submitterId"
              : !checkerId
              ? "Es necesario el campo checkerId"
              : "Es necesario el campo submitterId",
        })
      );

      return;
    }

    if (!estado) {
      dispatch(
        addError({
          errorMessage:
            "Es necesario elegir el estado por el cual filtrar los hechos",
        })
      );
      return;
    }
    const estadoParseado = parseStatus(estado);

    if (!estadoParseado) {
      dispatch(
        addError({
          errorMessage:
            "Es necesario elegir el estado por el cual filtrar los hechos",
        })
      );
      return;
    }

    const respuesta = await filterHechosTrigger({
      checkerId: Number(checkerId),
      submitterId: Number(submitterId),
      estado: estadoParseado,
    }).unwrap();

    console.log(respuesta);
  };
  return (
    <Grid2
      container
      mt={2}
      sx={{
        height: "85vh",
        bgcolor: (theme) => theme.palette.verificando_uy_light.main,
      }}
      p={2}
      spacing={2}
    >
      <Grid2 size={3} height="100%">
        <Paper sx={{ p: 2, height: "100%" }}>
          <Button fullWidth variant="contained" color="verificando_uy_light">
            Filtrar por estado
          </Button>
        </Paper>
      </Grid2>
      <Grid2 size={9} sx={{ height: "100%" }}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <form onSubmit={handleSubmitFilter}>
            <Grid2
              container
              alignItems="center"
              alignContent="center"
              flexDirection="column"
              spacing={1}
            >
              <Grid2 container spacing={2} size={6} justifyContent="center">
                <TextField
                  type="number"
                  sx={{ flex: 1 }}
                  label="Checker ID"
                  value={checkerId}
                  onChange={(event) => {
                    setCheckerId(event.target.value);
                  }}
                />
                <TextField
                  type="number"
                  sx={{ flex: 1 }}
                  label="Submitter ID"
                  value={submitterId}
                  onChange={(event) => {
                    setSubmitterId(event.target.value);
                  }}
                />
                <FormControl sx={{ width: "100%" }} size="small">
                  <InputLabel id="status-select">Estado</InputLabel>
                  <Select
                    label="Rol"
                    labelId="rol-select"
                    value={estado}
                    onChange={(event) => {
                      setEstado(event.target.value);
                    }}
                  >
                    {estados.map((estado, index) => (
                      <MenuItem value={estado} key={index + 1}>
                        {estado}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 container size={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="verificando_uy_light"
                  type="submit"
                >
                  Filtrar
                </Button>
              </Grid2>
            </Grid2>
          </form>
          <Grid2
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                  innerRadius: 40,
                  outerRadius: 146,
                  paddingAngle: 2,
                  cornerRadius: 12,
                  startAngle: -136,
                  endAngle: 224,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={600}
              height={300}
            />
          </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
};
