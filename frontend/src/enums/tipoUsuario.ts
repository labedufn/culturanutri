export enum TipoUsuario {
  ADMINISTRADOR = "Administrador",
  AVALIADOR = "Avaliador",
}

export const tipoUsuarioOptions = [
  { value: TipoUsuario.ADMINISTRADOR, label: "Administrador" },
  { value: TipoUsuario.AVALIADOR, label: "Avaliador" },
];
