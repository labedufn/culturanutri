export function formatarCnae(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{4})(\d)/, "$1-$2")
    .replace(/(\d{4}-\d)(\d)/, "$1/$2")
    .slice(0, 9);
}
