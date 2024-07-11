export enum TipoUsuario {
  ADMINISTRADOR = "ADMINISTRADOR",
  AVALIADOR = "AVALIADOR",
}

export const tipoUsuarioOptions = [
  { value: TipoUsuario.ADMINISTRADOR, label: "Administrador" },
  { value: TipoUsuario.AVALIADOR, label: "Avaliador" },
];
