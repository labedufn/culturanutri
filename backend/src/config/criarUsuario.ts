import { TipoUsuario, Usuario } from "@models/Usuario";
import { CriarUsuarioService } from "@services/usuario/CriarUsuarioService";
import readlineSync from "readline-sync";

function converterTipoUsuario(tipo: string): TipoUsuario {
  if (!Object.values(TipoUsuario).includes(tipo as TipoUsuario)) {
    throw new Error("Tipo de usuário inválido");
  }
  return tipo as TipoUsuario;
}

async function criarUsuario() {
  console.log("Por favor, insira os dados para criar o usuário:");

  const nome = readlineSync.question("Nome: ");
  const sobrenome = readlineSync.question("Sobrenome: ");
  const cpf = readlineSync.question("CPF: ");
  const email = readlineSync.question("Email: ");
  const senha = readlineSync.question("Senha: ", {
    hideEchoBack: true,
  });
  const tipoString = readlineSync.question("Tipo (ex. ADMINISTRADOR): ");
  const tipo = converterTipoUsuario(tipoString);

  const criarUsuarioService = new CriarUsuarioService();

  const usuario: Usuario = {
    nome,
    sobrenome,
    cpf,
    email,
    senha,
    tipo,
    instituicao: "",
    data_cadastro: new Date(),
    data_alteracao: new Date(),
    ativo: 1,
    ultimo_login: new Date(),
  };

  try {
    const usuarioCriado = await criarUsuarioService.execute(usuario);
    console.log("Usuário criado com sucesso:", usuarioCriado);
  } catch (error) {
    console.error("Erro ao criar usuário:", error.message);
  }
}

criarUsuario();
