export function formatarDataHora(data: any) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();
  const horas = String(dataObj.getHours()).padStart(2, "0");
  const minutos = String(dataObj.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
}

export function formatarData(data: any) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function verificarExpiracao(dataExpiracao: any) {
  const dataExpiracaoUTC = new Date(dataExpiracao).getTime();
  const dataAtualUTC = new Date().getTime();
  const quinzeMinutosEmMilissegundos = 15 * 60 * 1000;

  return dataAtualUTC - dataExpiracaoUTC > quinzeMinutosEmMilissegundos;
}
