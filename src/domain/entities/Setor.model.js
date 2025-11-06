/**
 * Modelo da Entidade 'Setor'.
 * 
 * Representa uma instância de Setor presente no sistema.
 */
export class SetorModel {
  id;
  nome;
  descricao;
  descricaoAtividades;

  constructor(
    id,
    nome,
    descricao,
    descricaoAtividades
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.descricaoAtividades = descricaoAtividades;
  }
}