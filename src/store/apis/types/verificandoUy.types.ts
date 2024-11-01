import { Status } from "../../../interfaces/hecho.interfaces";

export type LoginArgs = {
  email: string;
  password: string;
};
export type LogoutArgs = {
  jwt: string;
};

export type RegisterUsuarioArgs = {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  cedula: string;
  password: string;
  rol: string;
};
export type FilterHechosArgs = {
  estado: Status;
  submitterId: number;
  checkerId: number;
};
