export enum Status {
  NUEVO = "NUEVO",
  EN_PROCESO = "EN_PROCESO",
  VERIFICADO = "VERIFICADO",
  PUBLICADO = "PUBLICADO",
  CANCELADO = "CANCELADO",
}

export interface Hecho {
  id: number;
  submitterId: number;
  nombre: string;
  descripcion: string;
  score: number;
  status: Status;
  checkerId: number;
  justification: string;
  dateCreated: Date;
  dateVerified: Date;
  dateUpdated: Date;
  categoria: string;
}
