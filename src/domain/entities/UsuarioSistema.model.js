/**
 * Modelo da Entidade 'UsuarioSistema'.
 * 
 * Representa uma instância de UsuárioSistema presente no sistema.
 */
export class UsuarioSistemaModel {
  id;
  usuario;
  senha;

  constructor(
    id,
    usuario,
    senha
  ) {
    this.id = id;
    this.usuario = usuario;
    this.senha = senha;
  }
}