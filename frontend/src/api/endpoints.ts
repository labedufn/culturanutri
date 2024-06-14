// @ts-nocheck
export const API_URL = process.env.API_URL;

export function LOGIN() {
  return {
    url: `${API_URL}/api/login`,
  };
}

export function CADASTRO() {
  return {
    url: `${API_URL}/api/cadastro`,
  };
}

export function RECUPERAR_SENHA() {
  return {
    url: `${API_URL}/api/recuperar-senha`,
  };
}

export function REDEFINIR_SENHA() {
  return {
    url: `${API_URL}/api/redefinir-senha`,
  };
}
