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

export function LISTAR_GESTORES() {
  return {
    url: `${API_URL}/api/listar-gestores`,
  };
}

export function BUSCAR_GESTOR() {
  return {
    url: `${API_URL}/api/buscar-gestor`,
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

export function CADASTRAR_AVALIACAO() {
  return {
    url: `${API_URL}/api/cadastrar-avaliacao`,
  };
}

export function BUSCAR_AVALIACAO() {
  return {
    url: `${API_URL}/api/buscar-avaliacao`,
  };
}

export function LISTAR_MANIPULADORES() {
  return {
    url: `${API_URL}/api/listar-manipulador-alimento`,
  };
}

export function CADASTRAR_MANIPULADOR() {
  return {
    url: `${API_URL}/api/cadastrar-manipulador-alimento`,
  };
}

export function BUSCAR_MANIPULADOR() {
  return {
    url: `${API_URL}/api/buscar-manipulador`,
  };
}

export function EDITAR_MANIPULADOR() {
  return {
    url: `${API_URL}/api/editar-manipulador`,
  };
}

export function EXCLUIR_MANIPULADOR() {
  return {
    url: `${API_URL}/api/excluir-manipulador`,
  };
}

export function CADASTRAR_LISTA_VERIFICACAO() {
  return {
    url: `${API_URL}/api/criar-lista-verificacao`,
  };
}

export function CALCULAR_LISTA_VERIFICACAO() {
  return {
    url: `${API_URL}/api/calcular-lista-verificacao`,
  };
}

export function CADASTRAR_ANALISE_QUALITATIVA() {
  return {
    url: `${API_URL}/api/cadastrar-analise-qualitativa`,
  };
}

export function CALCULAR_ANALISE_QUALITATIVA() {
  return {
    url: `${API_URL}/api/calcular-analise-qualitativa`,
  };
}
