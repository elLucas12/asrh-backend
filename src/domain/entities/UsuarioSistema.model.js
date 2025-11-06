/**
 * Modelo da Entidade 'UsuarioSistema'.
 * 
 * Representa uma instância de UsuárioSistema presente no sistema.
 */
export class UsuarioSistemaModel {
  usuario;
  senha;

  constructor(
    usuario,
    senha
  ) {
    this.usuario = usuario;
    this.senha = senha;
  }
}