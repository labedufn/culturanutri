export function formatarCnae(cnae: string) {
  const cnaeLimpo = cnae.replace(/\D/g, "");
  const cnaeFormatado = `${cnaeLimpo.substring(0, 4)}-${cnaeLimpo.substring(4, 6)}/${cnaeLimpo.substring(6)}`;

  return cnaeFormatado;
}
