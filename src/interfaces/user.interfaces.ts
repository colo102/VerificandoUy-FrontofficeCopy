export enum Rol {
  Citizen = "CI",
  Submitter = "S",
  Admin = "A",
  Checker = "CH",
}
export interface Token {
  sub: string; // The user's unique identifier (cedula)
  id: number; // The user's unique ID (idUsuario)
  rol: Rol; // The user's role
  iat: number; // The issued at timestamp
  exp: number; // The expiration timestamp (one year from issue)
}
