/**
 * Modelo da Entidade 'Funcao'.
 * 
 * Representa uma instância de funcão presente no sistema, que têm
 * relações ManyToOne para com a instância Setor e a instância Escala.
 */
export class FuncaoModel {
  id;
  nome;
  salario;
  setor;
  escala;

  constructor(
    id,
    nome,
    salario,
    setor,
    escala
  ) {
    this.id = id;
    this.nome = nome;
    this.salario = salario;
    this.setor = setor;
    this.escala = escala;
  }
}