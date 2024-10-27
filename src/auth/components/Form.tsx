import { Grid2, TextField } from "@mui/material";

export type FormContainerProps = {
  children: React.ReactNode;
  direction: "column" | "row";
};

export const FormContainer = ({ children, direction }: FormContainerProps) => {
  return (
    <Grid2 container flexDirection={direction} spacing={2}>
      {children}
    </Grid2>
  );
};

export type FormItemProps = {
  type: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  fullwidth?: boolean;
  dato: string;
  onDatoChange: (newDato: string) => void;
  size?: number;
  label: React.ReactNode;
};

export const FormItem = ({
  type,
  placeholder = "",
  fullwidth = false,
  dato,
  onDatoChange,
  size = 12,
  label,
}: FormItemProps) => {
  return (
    <Grid2 size={size}>
      <TextField
        label={label}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: {
            lang: "es",
          },
        }}
        size="small"
        type={type}
        placeholder={placeholder}
        fullWidth={fullwidth}
        value={dato}
        onChange={(event) => {
          onDatoChange(event.target.value);
        }}
      />
    </Grid2>
  );
};
