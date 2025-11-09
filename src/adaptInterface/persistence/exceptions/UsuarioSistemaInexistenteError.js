export class UsuarioSistemaInexistenteError extends Error {
  constructor(mensagem, opcoes) {
    super(mensagem, opcoes);
    this.name = this.constructor.name;
  }
}