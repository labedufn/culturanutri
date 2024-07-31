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

export function ENVIAR_CONVITE_USUARIO() {
  return {
    url: `${API_URL}/api/usuario`,
  };
}

export function EDITAR_USUARIO() {
  return {
    url: `${API_URL}/api/editar-usuario`,
  };
}

export function EXCLUIR_USUARIO() {
  return {
    url: `${API_URL}/api/excluir-usuario`,
  };
}

export function EDITAR_USUARIO_ADMIN() {
  return {
    url: `${API_URL}/api/editar-usuario-admin`,
  };
}

export function LISTAR_INFORMACOES_USUARIO() {
  return {
    url: `${API_URL}/api/listar-infos`,
  };
}

export function ALTERAR_SENHA_USUARIO() {
  return {
    url: `${API_URL}/api/alterar-senha-usuario`,
  };
}

export function LISTAR_USUARIOS() {
  return {
    url: `${API_URL}/api/listar-usuarios`,
  };
}

export function LISTAR_INSTITUICOES() {
  return {
    url: `${API_URL}/api/listar-instituicoes`,
  };
}

export function LISTAR_CONVITES() {
  return {
    url: `${API_URL}/api/listar-convites`,
  };
}

export function CADASTRAR_ESTABELECIMENTO() {
  return {
    url: `${API_URL}/api/cadastrar-estabelecimento`,
  };
}

export function LISTAR_ESTABELECIMENTOS() {
  return {
    url: `${API_URL}/api/listar-estabelecimentos`,
  };
}

export function EDITAR_ESTABELECIMENTO() {
  return {
    url: `${API_URL}/api/editar-estabelecimento`,
  };
}

export function EXCLUIR_ESTABELECIMENTO() {
  return {
    url: `${API_URL}/api/excluir-estabelecimento`,
  };
}

export function BUSCAR_USUARIO() {
  return {
    url: `${API_URL}/api/buscar-usuario`,
  };
}

export function CADASTRAR_GESTOR() {
  return {
    url: `${API_URL}/api/cadastrar-gestor`,
  };
}

export function LISTAR_GESTOR() {
  return {
    url: `${API_URL}/api/listar-gestor`,
  };
}

export function EDITAR_GESTOR() {
  return {
    url: `${API_URL}/api/editar-gestor`,
  };
}

export function EXCLUIR_GESTOR() {
  return {
    url: `${API_URL}/api/excluir-gestor`,
  };
}
