/**
 * Modelo da Entidade 'Escala'.
 * 
 * Representa uma instância de Escala presente no sistema.
 */
export class EscalaModel {
  id;
  nome;
  horasDiarias;
  diasSemana;

  constructor(
    id,
    nome,
    horasDiarias,
    diasSemana
  ) {
    this.id = id;
    this.nome = nome;
    this.horasDiarias = horasDiarias;
    this.diasSemana = diasSemana;
  }
}